suppressPackageStartupMessages({library(metafor);library(jsonlite)})
try(Sys.setlocale('LC_CTYPE','en_US.UTF-8'),silent=TRUE)
args<-commandArgs(trailingOnly=TRUE)
root<-normalizePath(if(length(args)) args[1] else '.')
out<-file.path(root,'results')
dir.create(out,recursive=TRUE,showWarnings=FALSE)
d<-read.csv(file.path(root,'inputs/all_39_models.csv'),stringsAsFactors=FALSE,colClasses=c(article_id='character'))
d$included<-as.logical(d$included)
stopifnot(nrow(d)==39,!anyDuplicated(d$record_id))
grades<-c('Strong','Moderate','Weak'); domains<-c('B1','B2','B3','Overall')
transform_data<-function(x){x$yi<-log(x$effect);x$sei<-(log(x$ci_high)-log(x$ci_low))/(2*qnorm(.975));x}
d<-transform_data(d)
retained<-d[d$included,]
stopifnot(nrow(retained)==38,length(unique(retained$article_id))==23,
 all(unlist(retained[,domains]) %in% grades), all(retained$ci_low>0),all(retained$sei>0))

# Intercept-only REML models with Knapp-Hartung intervals.
# Estimates are treated as independent within each fitted stratum.
pool<-function(x,analysis,domain='All',grade='All'){
 k<-nrow(x)
 z<-data.frame(analysis,domain,grade,n_effects=k,n_articles=length(unique(x$article_id)),
 n_dependency_clusters=length(unique(x$dependency_cluster_id)),estimate=NA_real_,ci_low=NA_real_,ci_high=NA_real_,
 I2=NA_real_,tau2=NA_real_,p_value=NA_real_,status='No estimates')
 if(k==0)return(z)
 if(k==1){z$estimate<-x$effect;z$ci_low<-x$ci_low;z$ci_high<-x$ci_high;z$status<-'Single published estimate';return(z)}
 fit<-rma(yi=yi,sei=sei,data=x,method='REML',test='knha')
 z$estimate<-exp(as.numeric(fit$beta));z$ci_low<-exp(fit$ci.lb);z$ci_high<-exp(fit$ci.ub)
 z$I2<-fit$I2;z$tau2<-fit$tau2;z$p_value<-fit$pval;z$status<-'REML-KH'
 z
}
strata<-function(x,name){
 r<-list(pool(x,name))
 for(dom in domains) for(g in grades)r[[length(r)+1]]<-pool(x[x[[dom]]==g,],name,dom,g)
 do.call(rbind,r)
}
primary<-strata(retained,'Primary')
hr<-strata(retained[retained$effect_measure %in% c('HR','aHR'),],'HR_aHR_only')
by_outcome<-do.call(rbind,lapply(c('ASD','ADHD'),function(g)strata(retained[retained$outcome_group==g,],g)))
loo<-do.call(rbind,lapply(seq_len(nrow(retained)),function(i){z<-pool(retained[-i,],'Leave_one_effect_out');z$omitted_id<-retained$record_id[i];z}))
# Additional omission diagnostics retain exactly the same pool estimator.
loo_cluster<-do.call(rbind,lapply(c('article_id','dependency_cluster_id'),function(field){
 do.call(rbind,lapply(unique(retained[[field]]),function(id){z<-pool(retained[retained[[field]]!=id,],paste0('Leave_one_',field));z$omitted_id<-id;z}))
}))

# Verify leave-one-out against metafor's separate helper.
fit<-rma(yi=yi,sei=sei,data=retained,method='REML',test='knha')
refloo<-leave1out(fit,transf=exp)
stopifnot(max(abs(loo$estimate-refloo$estimate))<1e-10,max(abs(loo$ci_low-refloo$ci.lb))<1e-10,max(abs(loo$ci_high-refloo$ci.ub))<1e-10)

write.csv(primary,file.path(out,'primary_pooled_strata.csv'),row.names=FALSE,na='')
write.csv(hr,file.path(out,'hr_sensitivity.csv'),row.names=FALSE,na='')
write.csv(by_outcome,file.path(out,'outcome_sensitivity.csv'),row.names=FALSE,na='')
write.csv(loo,file.path(out,'leave_one_effect_out.csv'),row.names=FALSE,na='')
write.csv(loo_cluster,file.path(out,'leave_one_article_or_cluster_out.csv'),row.names=FALSE,na='')
write.csv(retained,file.path(out,'analysis_membership_38.csv'),row.names=FALSE,na='')
write_json(list(primary=primary,hr=hr,by_outcome=by_outcome,
 loo_range=range(loo$estimate),counts=list(inventory_articles=24,inventory_estimates=39,retained_articles=23,retained_estimates=38,dependency_clusters=15),
 method=list(estimator='REML',inference='Knapp-Hartung (test=knha)',scale='natural log of reported ratio',se='(ln upper - ln lower) / (2 * qnorm(0.975))',
  singleton='retain reported effect and CI; no pooled diamond, heterogeneity or meta-analytic p value',empty='No estimates; no model',
  weighting='inverse (sampling variance + stratum-specific tau squared)',
  dependency_adjustment='Conventional intervals assume independent estimates; article and source-cohort clusters support omission diagnostics.',
  meta_regression=FALSE,moderators=FALSE,between_grade_tests=FALSE,
  estimates_mixed='Reported ratio measures and exact endpoints retained. HR-only and outcome-category restrictions provided.',
  grading='DAG132 coverage rules; complete coverage of either sufficient set qualifies as Strong. Exclude selected models conditioning on C14/C16/C17',
  sensitivity_rule='Construct-coverage grades are held fixed across sensitivity analyses.'),
 validation=list(loo_independently_matched=TRUE)),
 file.path(out,'results_master.json'),pretty=TRUE,auto_unbox=TRUE,digits=15,na='null')
writeLines(capture.output(sessionInfo()),file.path(out,'sessionInfo.txt'))
print(primary,row.names=FALSE)
cat('HR-only total:',hr$estimate[1],hr$ci_low[1],hr$ci_high[1],'\n')
cat('Leave one effect out:',range(loo$estimate),'\n')

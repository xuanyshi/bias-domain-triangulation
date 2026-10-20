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

legacy<-strata(retained[retained$B4_0904=='No',],'Legacy_B4_No')
narrow<-strata(retained[!retained$outcome_kind %in% c('attention_performance','broadband_behaviour'),],'ASD_ADHD_diagnoses_or_traits')
write.csv(rbind(legacy,narrow),file.path(out,'supplementary_restrictions.csv'),row.names=FALSE,na='')
write_json(list(legacy=legacy,narrow=narrow),file.path(out,'supplementary_restrictions.json'),pretty=TRUE,auto_unbox=TRUE,digits=15,na='null')
print(rbind(legacy,narrow)[c(1,14),])
writeLines(capture.output(sessionInfo()),file.path(out,'restriction_sessionInfo.txt'))

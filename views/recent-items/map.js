function(doc) {
  if (doc.USER_CRASH_DATE) {
      var value = {
          user_crash_date: doc.USER_CRASH_DATE,
          android_version: doc.ANDROID_VERSION,
          application_version_name: doc.APP_VERSION_NAME,
          application_package: doc.APPLICATION_PACKAGE,
      };
      if(doc.SIGNATURE){
          value.signature = doc.SIGNATURE;
      } else {
          value.stack_trace = doc.STACK_TRACE;
      }
      if(doc.BUILD.MANUFACTURER) {
          value.device = doc.BUILD.MANUFACTURER + " " + doc.BUILD.BRAND + " " + doc.BUILD.MODEL;
      } else {
          value.device = doc.BUILD.BRAND + " " + doc.BUILD.MODEL;
      }
      emit(new Date(doc.USER_CRASH_DATE), value);
  }
};
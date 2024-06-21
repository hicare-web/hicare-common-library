export const enum TimeUnit {
    SECOND = 'second',
    MINUTE = 'minute',
    HOUR = 'hour',
    DAY = 'day',
    DAYS = 'days',
    MONTH = 'month',
    MONTHS = 'months',
    YEAR = 'year',
}

export const enum DateFormatUnit {
    // 변경 예정
    MMDDYYYY = 'MM/DD/YYYY',
    MMddyyyy = 'MM/dd/yyyy',
    YYYYMMDD = 'YYYY-MM-DD',
}

export const enum PageRouteUnit {
    CLAIM = 'claim',
    CANDIDATE = 'candidate',
    REPORT_MONTHLY = 'reportMonthly',
    REPORT_DOCUMENTS = 'reportDocuments',
    ENROLLMENT = 'enrollment',
    PATIENT = 'patient',
}

export const enum PageRefererUnit {
    PATIENT = '/patient',
    PATIENT_ADD = '/patient/add',
    CANDIDATE = '/candidate',
    CANDIDATE_CREATE = '/candidate/create',
    ENROLLMENT = '/enrollment',
    ENROLLMENT_MONITORING = '/enrollment/monitoring',
    CLAIM = '/claim',
    REPORT_MONTHLY = '/report/monthly',
    REPORT_DOCUMENTS = '/report/documents',
    MEMBER_MANAGER = '/memberMng',
    MEASURE_RANGE_MANAGER = '/measureRangeMng',
}

export const enum ServiceTypeUnit {
    RPM = 'RPM',
    CCM = 'CCM',
    RPMCCM = 'RPM/CCM',
}

export const enum CcmStatusUnit {
    PENDING_REVIEW = 'Pending Review',
    PENDING_LOCK = 'Pending Lock',
    COMPLETE = 'Complete',
}

export const enum HttpMethodUnit {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const enum SignatureUnit {
    VIEWED = 'Viewed',
    SIGNED = 'Signed',
    UPLOAD = 'Upload',
}

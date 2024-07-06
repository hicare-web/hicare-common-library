var Be = Object.defineProperty;
var Fe = (e, t, n) => t in e ? Be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var W = (e, t, n) => Fe(e, typeof t != "symbol" ? t + "" : t, n);
var He = /* @__PURE__ */ ((e) => (e.CLAIM_STATUS = "ca6e8e56-0d72-11ed-a226-06a78b1c250a", e.CONDITION = "056d5ca9-7734-11ec-a226-06a78b1c250a", e.CONSENT = "43798f96-774d-11ec-a226-06a78b1c250a", e.ELIGIBILITY_REVIEW = "13bb3215-7735-11ec-a226-06a78b1c250a", e.ENROLLMENT_STATUS = "1976c6a2-7735-11ec-a226-06a78b1c250a", e.GENDER = "823f4955-7733-11ec-a226-06a78b1c250a", e.MEASURE_TYPE = "1cb40907-7735-11ec-a226-06a78b1c250a", e.MEASURE_UNIT = "10eb65cb-c62f-4cb7-afe0-a8539cb5eaef", e.MEDICARE_ADVANTAGE = "f09c785f-8ec3-11ec-a226-06a78b1c250a", e.PHONE_TYPE = "e744358e-7733-11ec-a226-06a78b1c250a", e.PRIMARY_LANGUAGE = "b9191622-7733-11ec-a226-06a78b1c250a", e.QHR_ROLE = "ee875d4a-7734-11ec-a226-06a78b1c250a", e.RELATIONSHIP = "5f11a2c5-dafc-11ec-a226-06a78b1c250a", e.RPM_STATUS = "4979d075-7734-11ec-a226-06a78b1c250a", e.SIGNATURE = "16d67391-7735-11ec-a226-06a78b1c250a", e.SUFFIX = "62046605-7732-11ec-a226-06a78b1c250a", e.ELIGIBILITY_IN_REVIEW = "3bb0ef1d-7735-11ec-a226-06a78b1c250a", e.ELIGIBILITY_VERIFIED = "3bb2f31b-7735-11ec-a226-06a78b1c250a", e.ELIGIBILITY_FAILED = "3bb54028-7735-11ec-a226-06a78b1c250a", e.RPM_STATUS_COMPLETE = "dc77d674-ebaf-11ec-befa-02c8f3e7d8ef", e.RPM_STATUS_CANCELLED = "7bdb3039-7734-11ec-a226-06a78b1c250a", e.RPM_STATUS_ACTIVE = "7bd982c8-7734-11ec-a226-06a78b1c250a", e.RPM_STATUS_READY_TO_ACTIVE = "b0fa0f6e-8258-11ed-b2c5-020c1cf7a0c9", e.RPM_STATUS_PENDING_DEVICES = "7bd7d122-7734-11ec-a226-06a78b1c250a", e.ENROLLMENT_ACTIVE = "7155877d-7735-11ec-a226-06a78b1c250a", e.ENROLLMENT_COMPLETED = "715749be-7735-11ec-a226-06a78b1c250a", e.ENROLLMENT_SUSPENDED = "71590146-7735-11ec-a226-06a78b1c250a", e.GENDER_MALE = "af345a3c-7733-11ec-a226-06a78b1c250a", e.GEDNER_FEMALE = "af360f6f-7733-11ec-a226-06a78b1c250a", e.GENDER_X = "af37f483-7733-11ec-a226-06a78b1c250a", e.SIGNATURE_VIEWED = "4cb06388-7735-11ec-a226-06a78b1c250a", e.SIGNATURE_SIGNED = "6f20fc68-7735-11ec-a226-06a78b1c250a", e.SIGNATURE_UPLOAD = "b7c9e30b-9211-11ed-a919-06a78b1c250a", e.QHP_ROLE_FACILITY_CT = "e2cabdad-aad2-11ee-a0a9-062bbfc7eb11", e.QHP_ROLE_HICARE_NP = "a465cb75-28f1-11ee-9a36-0ab35bc0c726", e.QHP_ROLE_HICARE_CT = "0754b33c-ef84-11ed-b2c5-020c1cf7a0c9", e.QHP_ROLE_CLINIC_CT = "fb143db4-0988-11ee-a919-06a78b1c250a", e.QHP_ROLE_HICARE_RN = "11094071-7735-11ec-a226-06a78b1c250a", e.DELIVERY_STATUS_DELIVERED = "d42824be-7136-11ed-a919-06a78b1c250a", e.DELIVERY_STATUS_PACKAGE_READY = "953c2436-7734-11ec-a226-06a78b1c250a", e.DELIVERY_STATUS_PENDING_DEVICE = "953a541e-7734-11ec-a226-06a78b1c250a", e.USER_TYPE_CARETEAM_PORTAL_MEMBER = "e383d28c-dd19-11ee-858c-06fd0ed1919b", e.USER_TYPE_HICARE_CARE_TEAM = "8ca25293-cc3a-11ed-a919-06a78b1c250a", e.USER_TYPE_SERVICE = "6118206f-d4e2-11ec-a226-06a78b1c250a", e.USER_TYPE_PATIENT = "d22ae297-a8ca-11ec-a226-06a78b1c250a", e.USER_TYPE_STAFF = "136060fc-8adb-11ec-a226-06a78b1c250a", e.USER_TYPE_CARETEAM_MEMBER = "a1303ee9-7fd5-11ec-a226-06a78b1c250a", e.USER_TYPE_PROVIDER = "a124d864-7fd5-11ec-a226-06a78b1c250a", e.USER_TYPE_ADMIN = "a11a8f3a-7fd5-11ec-a226-06a78b1c250a", e.CONSENT_PRINT = "d38180de-9080-11ed-a919-06a78b1c250a", e.CONSENT_SIGN = "d9c70a7f-6d53-11ee-a9cb-02685550b348", e.CONSENT_IN_PERSON = "e6bba2a0-774d-11ec-a226-06a78b1c250a", e.CONSENT_PHYSICIAN = "e6b9b4e3-774d-11ec-a226-06a78b1c250a", e.MEASURE_TYPE_WT = "0f1f5415-7759-11ec-a226-06a78b1c250a", e.MEASURE_TYPE_TEMP = "0f21103e-7759-11ec-a226-06a78b1c250a", e.MEASURE_TYPE_SPO2 = "0f22ceff-7759-11ec-a226-06a78b1c250a", e.MEASURE_TYPE_BG = "0f1dbacf-7759-11ec-a226-06a78b1c250a", e.MEASURE_TYPE_BP = "0f1bb6d5-7759-11ec-a226-06a78b1c250a", e.MEASURE_BP_BP = "ad908305-c418-4cde-a924-1885d504f8e7", e.MEASURE_BP_PULSE = "02ef56ad-8ee3-11ec-a226-06a78b1c250a", e.MEASURE_BP_BP_SYS = "02edc507-8ee3-11ec-a226-06a78b1c250a", e.MEASURE_BP_BP_DIA = "02ea4071-8ee3-11ec-a226-06a78b1c250a", e.MEASURE_SPO2_SPO2 = "02f0f91f-8ee3-11ec-a226-06a78b1c250a", e.MEASURE_SPO2_PULSE = "02f2c407-8ee3-11ec-a226-06a78b1c250a", e.MEASURE_BG_BG = "e8587f25-a436-11ec-a226-06a78b1c250a", e.MEASURE_TEMP_TEMP = "febc6fb5-3abe-4f1e-af83-820252c97483", e.MONITORING_TYPE_ALERT = "2a8dc406-ac1a-11ec-a226-06a78b1c250a", e.MONITORING_TYPE_NOTIFICATION = "2a8f7dfd-ac1a-11ec-a226-06a78b1c250a", e.MONITORING_TYPE_MEASURE_NOTE = "96f01500-c538-11ec-a226-06a78b1c250a", e.MONITORING_TYPE_NOTIFICATION_OVERDUE = "8fc9c134-beb3-11ec-a226-06a78b1c250a", e.MONITORING_TYPE_NOTIFICATION_CANCEL_REQ_CALL = "8fc7bf76-beb3-11ec-a226-06a78b1c250a", e.MONITORING_TYPE_NOTIFICATION_REQ_CALL = "8fc3c625-beb3-11ec-a226-06a78b1c250a", e.PRIMARY_LANGUAGE_KOREAN = "e481e75f-7733-11ec-a226-06a78b1c250a", e.PRIMARY_LANGUAGE_SPANISH = "e4804da9-7733-11ec-a226-06a78b1c250a", e.PRIMARY_LANGUAGE_ENGLISH = "e47e56de-7733-11ec-a226-06a78b1c250a", e))(He || {});
const vn = {
  COMMON_STRUCTURE: {
    CLAIM_STATUS: "ca6e8e56-0d72-11ed-a226-06a78b1c250a",
    CONDITION: "056d5ca9-7734-11ec-a226-06a78b1c250a",
    CONSENT: "43798f96-774d-11ec-a226-06a78b1c250a",
    ELIGIBILITY_REVIEW: "13bb3215-7735-11ec-a226-06a78b1c250a",
    ENROLLMENT_STATUS: "1976c6a2-7735-11ec-a226-06a78b1c250a",
    GENDER: "823f4955-7733-11ec-a226-06a78b1c250a",
    MEASURE_TYPE: "1cb40907-7735-11ec-a226-06a78b1c250a",
    MEASURE_UNIT: "10eb65cb-c62f-4cb7-afe0-a8539cb5eaef",
    MEDICARE_ADVANTAGE: "f09c785f-8ec3-11ec-a226-06a78b1c250a",
    PHONE_TYPE: "e744358e-7733-11ec-a226-06a78b1c250a",
    PRIMARY_LANGUAGE: "b9191622-7733-11ec-a226-06a78b1c250a",
    QHR_ROLE: "ee875d4a-7734-11ec-a226-06a78b1c250a",
    RELATIONSHIP: "5f11a2c5-dafc-11ec-a226-06a78b1c250a",
    RPM_STATUS: "4979d075-7734-11ec-a226-06a78b1c250a",
    SIGNATURE: "16d67391-7735-11ec-a226-06a78b1c250a",
    SUFFIX: "62046605-7732-11ec-a226-06a78b1c250a"
    /* SUFFIX */
  },
  ELIGIBILITY_TYPE: {
    IN_REVIEW: "3bb0ef1d-7735-11ec-a226-06a78b1c250a",
    VERIFIED: "3bb2f31b-7735-11ec-a226-06a78b1c250a",
    FAILED: "3bb54028-7735-11ec-a226-06a78b1c250a"
    /* ELIGIBILITY_FAILED */
  },
  RPM_STATUS: {
    COMPLETE: "dc77d674-ebaf-11ec-befa-02c8f3e7d8ef",
    CANCELLED: "7bdb3039-7734-11ec-a226-06a78b1c250a",
    ACTIVE: "7bd982c8-7734-11ec-a226-06a78b1c250a",
    READY_TO_ACTIVE: "b0fa0f6e-8258-11ed-b2c5-020c1cf7a0c9",
    PENDING_DEVICES: "7bd7d122-7734-11ec-a226-06a78b1c250a"
    /* RPM_STATUS_PENDING_DEVICES */
  },
  ENROLLMENT_STATUS: {
    ACTIVE: "7155877d-7735-11ec-a226-06a78b1c250a",
    COMPLETED: "715749be-7735-11ec-a226-06a78b1c250a",
    SUSPENDED: "71590146-7735-11ec-a226-06a78b1c250a"
    /* ENROLLMENT_SUSPENDED */
  },
  GENDER_TYPE: {
    X: "af37f483-7733-11ec-a226-06a78b1c250a",
    MALE: "af345a3c-7733-11ec-a226-06a78b1c250a",
    FEMALE: "af360f6f-7733-11ec-a226-06a78b1c250a"
    /* GEDNER_FEMALE */
  },
  SIGNATURE_TYPE: {
    VIEWED: "4cb06388-7735-11ec-a226-06a78b1c250a",
    SIGNED: "6f20fc68-7735-11ec-a226-06a78b1c250a",
    UPLOAD: "b7c9e30b-9211-11ed-a919-06a78b1c250a"
    /* SIGNATURE_UPLOAD */
  },
  QHP_ROLE: {
    FACILITY_CT: "e2cabdad-aad2-11ee-a0a9-062bbfc7eb11",
    HICARE_NP: "a465cb75-28f1-11ee-9a36-0ab35bc0c726",
    HICARE_CT: "0754b33c-ef84-11ed-b2c5-020c1cf7a0c9",
    CLINIC_CT: "fb143db4-0988-11ee-a919-06a78b1c250a",
    HICARE_RN: "11094071-7735-11ec-a226-06a78b1c250a"
    /* QHP_ROLE_HICARE_RN */
  },
  DELIVERY_STATUS: {
    DELIVERED: "d42824be-7136-11ed-a919-06a78b1c250a",
    PACKAGE_READY: "953c2436-7734-11ec-a226-06a78b1c250a",
    PENDING_DEVICE: "953a541e-7734-11ec-a226-06a78b1c250a"
    /* DELIVERY_STATUS_PENDING_DEVICE */
  },
  USER_TYPE: {
    CARETEAM_PORTAL_MEMBER: "e383d28c-dd19-11ee-858c-06fd0ed1919b",
    HICARE_CARE_TEAM: "8ca25293-cc3a-11ed-a919-06a78b1c250a",
    SERVICE: "6118206f-d4e2-11ec-a226-06a78b1c250a",
    PATIENT: "d22ae297-a8ca-11ec-a226-06a78b1c250a",
    STAFF: "136060fc-8adb-11ec-a226-06a78b1c250a",
    CARETEAM_MEMBER: "a1303ee9-7fd5-11ec-a226-06a78b1c250a",
    PROVIDER: "a124d864-7fd5-11ec-a226-06a78b1c250a",
    ADMIN: "a11a8f3a-7fd5-11ec-a226-06a78b1c250a"
    /* USER_TYPE_ADMIN */
  },
  CONSENT: {
    PRINT: "d38180de-9080-11ed-a919-06a78b1c250a",
    SIGN: "d9c70a7f-6d53-11ee-a9cb-02685550b348",
    IN_PERSON: "e6bba2a0-774d-11ec-a226-06a78b1c250a",
    PHYSICIAN: "e6b9b4e3-774d-11ec-a226-06a78b1c250a"
    /* CONSENT_PHYSICIAN */
  },
  MEASURE_TYPE: {
    WT: "0f1f5415-7759-11ec-a226-06a78b1c250a",
    TEMP: "0f21103e-7759-11ec-a226-06a78b1c250a",
    SPO2: "0f22ceff-7759-11ec-a226-06a78b1c250a",
    BG: "0f1dbacf-7759-11ec-a226-06a78b1c250a",
    BP: "0f1bb6d5-7759-11ec-a226-06a78b1c250a",
    BP_IN_BP: "ad908305-c418-4cde-a924-1885d504f8e7",
    BP_IN_PULSE: "02ef56ad-8ee3-11ec-a226-06a78b1c250a",
    BP_IN_BP_IN_SYS: "02edc507-8ee3-11ec-a226-06a78b1c250a",
    BP_IN_BP_IN_DIA: "02ea4071-8ee3-11ec-a226-06a78b1c250a",
    SPO2_IN_SPO2: "02f0f91f-8ee3-11ec-a226-06a78b1c250a",
    SPO2_IN_PULSE: "02f2c407-8ee3-11ec-a226-06a78b1c250a",
    BG_IN_BG: "e8587f25-a436-11ec-a226-06a78b1c250a",
    TEMP_IN_TEMP: "febc6fb5-3abe-4f1e-af83-820252c97483"
    /* MEASURE_TEMP_TEMP */
  },
  MONITORING_TYPE: {
    ALERT: "2a8dc406-ac1a-11ec-a226-06a78b1c250a",
    NOTIFICATION: "2a8f7dfd-ac1a-11ec-a226-06a78b1c250a",
    MEASURE_NOTE: "96f01500-c538-11ec-a226-06a78b1c250a",
    NOTIFICATION_OVERDUE: "8fc9c134-beb3-11ec-a226-06a78b1c250a",
    NOTIFICATION_CANCEL_REQ_CALL: "8fc7bf76-beb3-11ec-a226-06a78b1c250a",
    NOTIFICATION_REQ_CALL: "8fc3c625-beb3-11ec-a226-06a78b1c250a"
    /* MONITORING_TYPE_NOTIFICATION_REQ_CALL */
  },
  PRIMARY_LANGUAGE: {
    KOREAN: "e481e75f-7733-11ec-a226-06a78b1c250a",
    SPANISH: "e4804da9-7733-11ec-a226-06a78b1c250a",
    ENGLISH: "e47e56de-7733-11ec-a226-06a78b1c250a"
    /* PRIMARY_LANGUAGE_ENGLISH */
  }
};
var je = /* @__PURE__ */ ((e) => (e["ca6e8e56-0d72-11ed-a226-06a78b1c250a"] = "CLAIM_STATUS ", e["056d5ca9-7734-11ec-a226-06a78b1c250a"] = "CONDITION ", e["43798f96-774d-11ec-a226-06a78b1c250a"] = "CONSENT ", e["13bb3215-7735-11ec-a226-06a78b1c250a"] = "ELIGIBILITY_REVIEW ", e["1976c6a2-7735-11ec-a226-06a78b1c250a"] = "ENROLLMENT_STATUS ", e["823f4955-7733-11ec-a226-06a78b1c250a"] = "GENDER ", e["1cb40907-7735-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE ", e["10eb65cb-c62f-4cb7-afe0-a8539cb5eaef"] = "MEASURE_UNIT ", e["f09c785f-8ec3-11ec-a226-06a78b1c250a"] = "MEDICARE_ADVANTAGE ", e["e744358e-7733-11ec-a226-06a78b1c250a"] = "PHONE_TYPE ", e["b9191622-7733-11ec-a226-06a78b1c250a"] = "PRIMARY_LANGUAGE ", e["ee875d4a-7734-11ec-a226-06a78b1c250a"] = "QHR_ROLE ", e["5f11a2c5-dafc-11ec-a226-06a78b1c250a"] = "RELATIONSHIP ", e["4979d075-7734-11ec-a226-06a78b1c250a"] = "RPM_STATUS ", e["16d67391-7735-11ec-a226-06a78b1c250a"] = "SIGNATURE ", e["62046605-7732-11ec-a226-06a78b1c250a"] = "SUFFIX ", e["3bb0ef1d-7735-11ec-a226-06a78b1c250a"] = "ELIGIBILITY_IN_REVIEW ", e["3bb2f31b-7735-11ec-a226-06a78b1c250a"] = "ELIGIBILITY_VERIFIED ", e["3bb54028-7735-11ec-a226-06a78b1c250a"] = "ELIGIBILITY_FAILED ", e["dc77d674-ebaf-11ec-befa-02c8f3e7d8ef"] = "RPM_STATUS_COMPLETE ", e["7bdb3039-7734-11ec-a226-06a78b1c250a"] = "RPM_STATUS_CANCELLED ", e["7bd982c8-7734-11ec-a226-06a78b1c250a"] = "RPM_STATUS_ACTIVE ", e["b0fa0f6e-8258-11ed-b2c5-020c1cf7a0c9"] = "RPM_STATUS_READY_TO_ACTIVE ", e["7bd7d122-7734-11ec-a226-06a78b1c250a"] = "RPM_STATUS_PENDING_DEVICES ", e["7155877d-7735-11ec-a226-06a78b1c250a"] = "ENROLLMENT_ACTIVE ", e["715749be-7735-11ec-a226-06a78b1c250a"] = "ENROLLMENT_COMPLETED ", e["71590146-7735-11ec-a226-06a78b1c250a"] = "ENROLLMENT_SUSPENDED ", e["af345a3c-7733-11ec-a226-06a78b1c250a"] = "GENDER_MALE ", e["af360f6f-7733-11ec-a226-06a78b1c250a"] = "GEDNER_FEMALE ", e["af37f483-7733-11ec-a226-06a78b1c250a"] = "GENDER_X ", e["4cb06388-7735-11ec-a226-06a78b1c250a"] = "SIGNATURE_VIEWED ", e["6f20fc68-7735-11ec-a226-06a78b1c250a"] = "SIGNATURE_SIGNED ", e["b7c9e30b-9211-11ed-a919-06a78b1c250a"] = "SIGNATURE_UPLOAD ", e["e2cabdad-aad2-11ee-a0a9-062bbfc7eb11"] = "QHP_ROLE_FACILITY_CT ", e["a465cb75-28f1-11ee-9a36-0ab35bc0c726"] = "QHP_ROLE_HICARE_NP ", e["0754b33c-ef84-11ed-b2c5-020c1cf7a0c9"] = "QHP_ROLE_HICARE_CT ", e["fb143db4-0988-11ee-a919-06a78b1c250a"] = "QHP_ROLE_CLINIC_CT ", e["11094071-7735-11ec-a226-06a78b1c250a"] = "QHP_ROLE_HICARE_RN ", e["d42824be-7136-11ed-a919-06a78b1c250a"] = "DELIVERY_STATUS_DELIVERED ", e["953c2436-7734-11ec-a226-06a78b1c250a"] = "DELIVERY_STATUS_PACKAGE_READY ", e["953a541e-7734-11ec-a226-06a78b1c250a"] = "DELIVERY_STATUS_PENDING_DEVICE ", e["e383d28c-dd19-11ee-858c-06fd0ed1919b"] = "USER_TYPE_CARETEAM_PORTAL_MEMBER ", e["8ca25293-cc3a-11ed-a919-06a78b1c250a"] = "USER_TYPE_HICARE_CARE_TEAM ", e["6118206f-d4e2-11ec-a226-06a78b1c250a"] = "USER_TYPE_SERVICE ", e["d22ae297-a8ca-11ec-a226-06a78b1c250a"] = "USER_TYPE_PATIENT ", e["136060fc-8adb-11ec-a226-06a78b1c250a"] = "USER_TYPE_STAFF ", e["a1303ee9-7fd5-11ec-a226-06a78b1c250a"] = "USER_TYPE_CARETEAM_MEMBER ", e["a124d864-7fd5-11ec-a226-06a78b1c250a"] = "USER_TYPE_PROVIDER ", e["a11a8f3a-7fd5-11ec-a226-06a78b1c250a"] = "USER_TYPE_ADMIN ", e["d38180de-9080-11ed-a919-06a78b1c250a"] = "CONSENT_PRINT ", e["d9c70a7f-6d53-11ee-a9cb-02685550b348"] = "CONSENT_SIGN ", e["e6bba2a0-774d-11ec-a226-06a78b1c250a"] = "CONSENT_IN_PERSON ", e["e6b9b4e3-774d-11ec-a226-06a78b1c250a"] = "CONSENT_PHYSICIAN ", e["0f1f5415-7759-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE_WT ", e["0f21103e-7759-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE_TEMP ", e["0f22ceff-7759-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE_SPO2 ", e["0f1dbacf-7759-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE_BG ", e["0f1bb6d5-7759-11ec-a226-06a78b1c250a"] = "MEASURE_TYPE_BP ", e["ad908305-c418-4cde-a924-1885d504f8e7"] = "MEASURE_BP_BP ", e["02ef56ad-8ee3-11ec-a226-06a78b1c250a"] = "MEASURE_BP_PULSE ", e["02edc507-8ee3-11ec-a226-06a78b1c250a"] = "MEASURE_BP_BP_SYS ", e["02ea4071-8ee3-11ec-a226-06a78b1c250a"] = "MEASURE_BP_BP_DIA ", e["02f0f91f-8ee3-11ec-a226-06a78b1c250a"] = "MEASURE_SPO2_SPO2 ", e["02f2c407-8ee3-11ec-a226-06a78b1c250a"] = "MEASURE_SPO2_PULSE ", e["e8587f25-a436-11ec-a226-06a78b1c250a"] = "MEASURE_BG_BG ", e["febc6fb5-3abe-4f1e-af83-820252c97483"] = "MEASURE_TEMP_TEMP ", e["2a8dc406-ac1a-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_ALERT ", e["2a8f7dfd-ac1a-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_NOTIFICATION ", e["96f01500-c538-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_MEASURE_NOTE ", e["8fc9c134-beb3-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_NOTIFICATION_OVERDUE ", e["8fc7bf76-beb3-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_NOTIFICATION_CANCEL_REQ_CALL ", e["8fc3c625-beb3-11ec-a226-06a78b1c250a"] = "MONITORING_TYPE_NOTIFICATION_REQ_CALL ", e["e481e75f-7733-11ec-a226-06a78b1c250a"] = "PRIMARY_LANGUAGE_KOREAN ", e["e4804da9-7733-11ec-a226-06a78b1c250a"] = "PRIMARY_LANGUAGE_SPANISH ", e["e47e56de-7733-11ec-a226-06a78b1c250a"] = "PRIMARY_LANGUAGE_ENGLISH ", e))(je || {});
const Yn = {
  // EligibilityTypeCode
  "3bb0ef1d-7735-11ec-a226-06a78b1c250a": "ELIGIBILITY_IN_REVIEW",
  "3bb2f31b-7735-11ec-a226-06a78b1c250a": "ELIGIBILITY_VERIFIED",
  "3bb54028-7735-11ec-a226-06a78b1c250a": "ELIGIBILITY_FAILED",
  // RPM Status
  "dc77d674-ebaf-11ec-befa-02c8f3e7d8ef": "RPM_STATUS_COMPLETE",
  "7bdb3039-7734-11ec-a226-06a78b1c250a": "RPM_STATUS_CANCELLED",
  "7bd982c8-7734-11ec-a226-06a78b1c250a": "RPM_STATUS_ACTIVE",
  "b0fa0f6e-8258-11ed-b2c5-020c1cf7a0c9": "RPM_STATUS_READY_TO_ACTIVE",
  "7bd7d122-7734-11ec-a226-06a78b1c250a": "RPM_STATUS_PENDING_DEVICES",
  // EnrollmentStatusTypeCode
  "7155877d-7735-11ec-a226-06a78b1c250a": "ENROLLMENT_ACTIVE",
  "715749be-7735-11ec-a226-06a78b1c250a": "ENROLLMENT_COMPLETED",
  "71590146-7735-11ec-a226-06a78b1c250a": "ENROLLMENT_SUSPENDED",
  // GenderTypeCode
  "af345a3c-7733-11ec-a226-06a78b1c250a": "GENDER_MALE",
  "af360f6f-7733-11ec-a226-06a78b1c250a": "GEDNER_FEMALE",
  "af37f483-7733-11ec-a226-06a78b1c250a": "GENDER_X ",
  // SignatureTypeCode
  "4cb06388-7735-11ec-a226-06a78b1c250a": "SIGNATURE_VIEWED ",
  "6f20fc68-7735-11ec-a226-06a78b1c250a": "SIGNATURE_SIGNED ",
  "b7c9e30b-9211-11ed-a919-06a78b1c250a": "SIGNATURE_UPLOAD ",
  // QHP Role
  "e2cabdad-aad2-11ee-a0a9-062bbfc7eb11": "QHP_ROLE_FACILITY_CT ",
  "a465cb75-28f1-11ee-9a36-0ab35bc0c726": "QHP_ROLE_HICARE_NP ",
  "0754b33c-ef84-11ed-b2c5-020c1cf7a0c9": "QHP_ROLE_HICARE_CT ",
  "fb143db4-0988-11ee-a919-06a78b1c250a": "QHP_ROLE_CLINIC_CT ",
  "11094071-7735-11ec-a226-06a78b1c250a": "QHP_ROLE_HICARE_RN ",
  // Delivery Status
  "d42824be-7136-11ed-a919-06a78b1c250a": "DELIVERY_STATUS_DELIVERED ",
  "953c2436-7734-11ec-a226-06a78b1c250a": "DELIVERY_STATUS_PACKAGE_READY ",
  "953a541e-7734-11ec-a226-06a78b1c250a": "DELIVERY_STATUS_PENDING_DEVICE ",
  // User Type
  "e383d28c-dd19-11ee-858c-06fd0ed1919b": "USER_TYPE_CARETEAM_PORTAL_MEMBER ",
  "8ca25293-cc3a-11ed-a919-06a78b1c250a": "USER_TYPE_HICARE_CARE_TEAM ",
  "6118206f-d4e2-11ec-a226-06a78b1c250a": "USER_TYPE_SERVICE ",
  "d22ae297-a8ca-11ec-a226-06a78b1c250a": "USER_TYPE_PATIENT ",
  "136060fc-8adb-11ec-a226-06a78b1c250a": "USER_TYPE_STAFF ",
  "a1303ee9-7fd5-11ec-a226-06a78b1c250a": "USER_TYPE_CARETEAM_MEMBER ",
  "a124d864-7fd5-11ec-a226-06a78b1c250a": "USER_TYPE_PROVIDER ",
  "a11a8f3a-7fd5-11ec-a226-06a78b1c250a": "USER_TYPE_ADMIN ",
  // Consent
  "d38180de-9080-11ed-a919-06a78b1c250a": "CONSENT_PRINT ",
  "d9c70a7f-6d53-11ee-a9cb-02685550b348": "CONSENT_SIGN ",
  "e6bba2a0-774d-11ec-a226-06a78b1c250a": "CONSENT_IN_PERSON ",
  "e6b9b4e3-774d-11ec-a226-06a78b1c250a": "CONSENT_PHYSICIAN ",
  // Measure Type
  "0f1f5415-7759-11ec-a226-06a78b1c250a": "MEASURE_TYPE_WT ",
  "0f21103e-7759-11ec-a226-06a78b1c250a": "MEASURE_TYPE_TEMP ",
  "0f22ceff-7759-11ec-a226-06a78b1c250a": "MEASURE_TYPE_SPO2 ",
  "0f1dbacf-7759-11ec-a226-06a78b1c250a": "MEASURE_TYPE_BG ",
  "0f1bb6d5-7759-11ec-a226-06a78b1c250a": "MEASURE_TYPE_BP ",
  "ad908305-c418-4cde-a924-1885d504f8e7": "MEASURE_BP_BP ",
  "02ef56ad-8ee3-11ec-a226-06a78b1c250a": "MEASURE_BP_PULSE ",
  "02edc507-8ee3-11ec-a226-06a78b1c250a": "MEASURE_BP_BP_SYS ",
  "02ea4071-8ee3-11ec-a226-06a78b1c250a": "MEASURE_BP_BP_DIA ",
  "02f0f91f-8ee3-11ec-a226-06a78b1c250a": "MEASURE_SPO2_SPO2 ",
  "02f2c407-8ee3-11ec-a226-06a78b1c250a": "MEASURE_SPO2_PULSE ",
  "e8587f25-a436-11ec-a226-06a78b1c250a": "MEASURE_BG_BG ",
  "febc6fb5-3abe-4f1e-af83-820252c97483": "MEASURE_TEMP_TEMP ",
  // Monitoring Type
  "2a8dc406-ac1a-11ec-a226-06a78b1c250a": "MONITORING_TYPE_ALERT ",
  "2a8f7dfd-ac1a-11ec-a226-06a78b1c250a": "MONITORING_TYPE_NOTIFICATION ",
  "96f01500-c538-11ec-a226-06a78b1c250a": "MONITORING_TYPE_MEASURE_NOTE ",
  "8fc9c134-beb3-11ec-a226-06a78b1c250a": "MONITORING_TYPE_NOTIFICATION_OVERDUE ",
  "8fc7bf76-beb3-11ec-a226-06a78b1c250a": "MONITORING_TYPE_NOTIFICATION_CANCEL_REQ_CALL ",
  "8fc3c625-beb3-11ec-a226-06a78b1c250a": "MONITORING_TYPE_NOTIFICATION_REQ_CALL ",
  // Primary Language
  "e481e75f-7733-11ec-a226-06a78b1c250a": "PRIMARY_LANGUAGE_KOREAN ",
  "e4804da9-7733-11ec-a226-06a78b1c250a": "PRIMARY_LANGUAGE_SPANISH ",
  "e47e56de-7733-11ec-a226-06a78b1c250a": "PRIMARY_LANGUAGE_ENGLISH "
};
var ke = /* @__PURE__ */ ((e) => (e.PHYSICIANATTESTATION = "Physician or physician’s staff member attests to receiving patient consent", e.INPERSON = "In person (patient is present or will sign at next appointment)", e.VIAAPP = "Sign electronically : Via App", e.PRINT = "Print out and physically signed by patient, and upload", e))(ke || {});
const Un = [
  {
    text: "current month",
    value: "0"
  },
  {
    text: "Today",
    value: "1"
  },
  {
    text: "1W",
    value: "7"
  },
  {
    text: "1M",
    value: "30"
  }
];
var We = /* @__PURE__ */ ((e) => (e.SECOND = "second", e.MINUTE = "minute", e.HOUR = "hour", e.DAY = "day", e.DAYS = "days", e.MONTH = "month", e.MONTHS = "months", e.YEAR = "year", e))(We || {}), ze = /* @__PURE__ */ ((e) => (e.MMDDYYYY = "MM/DD/YYYY", e.MMddyyyy = "MM/dd/yyyy", e.YYYYMMDD = "YYYY-MM-DD", e))(ze || {}), Qe = /* @__PURE__ */ ((e) => (e.CLAIM = "claim", e.CANDIDATE = "candidate", e.REPORT_MONTHLY = "reportMonthly", e.REPORT_DOCUMENTS = "reportDocuments", e.ENROLLMENT = "enrollment", e.PATIENT = "patient", e))(Qe || {}), Ze = /* @__PURE__ */ ((e) => (e.PATIENT = "/patient", e.PATIENT_ADD = "/patient/add", e.CANDIDATE = "/candidate", e.CANDIDATE_CREATE = "/candidate/create", e.ENROLLMENT = "/enrollment", e.ENROLLMENT_MONITORING = "/enrollment/monitoring", e.CLAIM = "/claim", e.REPORT_MONTHLY = "/report/monthly", e.REPORT_DOCUMENTS = "/report/documents", e.MEMBER_MANAGER = "/memberMng", e.MEASURE_RANGE_MANAGER = "/measureRangeMng", e))(Ze || {}), Ke = /* @__PURE__ */ ((e) => (e.RPM = "RPM", e.CCM = "CCM", e.RPMCCM = "RPM/CCM", e))(Ke || {}), Xe = /* @__PURE__ */ ((e) => (e.PENDING_REVIEW = "Pending Review", e.PENDING_LOCK = "Pending Lock", e.COMPLETE = "Complete", e))(Xe || {}), Je = /* @__PURE__ */ ((e) => (e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e.DELETE = "DELETE", e))(Je || {}), qe = /* @__PURE__ */ ((e) => (e.VIEWED = "Viewed", e.SIGNED = "Signed", e.UPLOAD = "Upload", e))(qe || {});
function wn(e, t) {
  return t.every((n) => n(e));
}
function X(e) {
  return Array.isArray(e);
}
function xn(e) {
  return typeof e == "boolean";
}
function K(e) {
  return e == null ? !0 : typeof e == "string" ? e.trim() === "" : Array.isArray(e) ? e.length === 0 : e instanceof Set || e instanceof Map ? e.size === 0 : typeof e == "object" ? e instanceof Date ? isNaN(e.getTime()) : Object.keys(e).length === 0 : typeof e == "number" ? isNaN(e) : typeof Buffer < "u" && Buffer.isBuffer(e) ? e.length === 0 : !1;
}
function Gn(e) {
  return e instanceof Error;
}
function ee(e) {
  return typeof e == "function";
}
function Cn(e) {
  return e == null;
}
function Bn(e) {
  return typeof e == "number" && !Number.isNaN(e);
}
function Ve(e) {
  if (typeof e != "string" && typeof e != "number" || typeof e == "string" && (e.includes(" ") || (e = e.trim(), e === "")))
    return !1;
  if (typeof e == "bigint") return !0;
  if (typeof e == "string" && e.includes(","))
    return et(e);
  if (typeof e == "string" && e.toLowerCase().includes("e"))
    return tt(e);
  const t = Number(e);
  return !isNaN(t) && isFinite(t);
}
function et(e) {
  const t = e.split(","), n = t[t.length - 1], a = n.indexOf(".");
  let r = "";
  if (a !== -1) {
    if (r = n.slice(a + 1), !/^\d+$/.test(r)) return !1;
    t[t.length - 1] = n.slice(0, a);
  }
  if (!t.slice(1).every((i) => i.length === 3)) return !1;
  const c = t.join("") + (a !== -1 ? "." + r : "");
  return !isNaN(parseFloat(c)) && isFinite(Number(c));
}
function tt(e) {
  const t = e.toLowerCase().split("e");
  if (t.length !== 2) return !1;
  const [n, a] = t;
  return Ve(n) && /^[+-]?\d+$/.test(a);
}
function Fn(e) {
  return typeof e == "string";
}
function nt(e) {
  let t = !1, n;
  return () => (t || (n = e(), t = !0), n);
}
var Hn = (e) => typeof e == "object" && e !== null;
function at(e, { waitMs: t, timing: n = "trailing", maxWaitMs: a }) {
  if (a !== void 0 && t !== void 0 && a < t) throw new Error(`debounce: maxWaitMs (${a}) cannot be less than waitMs (${t})`);
  let r, c, i, s, o = () => {
    if (c !== void 0) {
      let u = c;
      c = void 0, clearTimeout(u);
    }
    if (i === void 0) throw new Error("REMEDA[debounce]: latestCallArgs was unexpectedly undefined.");
    let d = i;
    i = void 0, s = e(...d);
  }, b = () => {
    if (r === void 0) return;
    let d = r;
    r = void 0, clearTimeout(d), i !== void 0 && o();
  }, M = (d) => {
    i = d, a !== void 0 && c === void 0 && (c = setTimeout(o, a));
  };
  return { call: (...d) => {
    if (r === void 0) n === "trailing" ? M(d) : s = e(...d);
    else {
      n !== "leading" && M(d);
      let u = r;
      r = void 0, clearTimeout(u);
    }
    return r = setTimeout(b, t ?? a ?? 0), s;
  }, cancel: () => {
    if (r !== void 0) {
      let d = r;
      r = void 0, clearTimeout(d);
    }
    if (c !== void 0) {
      let d = c;
      c = void 0, clearTimeout(d);
    }
    i = void 0;
  }, flush: () => (b(), s), get isPending() {
    return r !== void 0;
  }, get cachedValue() {
    return s;
  } };
}
function rt(e) {
  return typeof e == "object" && e !== null;
}
function jn(e, t) {
  if (rt(t)) {
    const n = Object.keys(t);
    if (n.length === 0)
      return !1;
    for (const a of n)
      if (t[a] === e)
        return !0;
    return !1;
  } else {
    let n = [];
    t instanceof Set ? n = Array.from(t) : Array.isArray(t) ? n = t : t instanceof Map && (n = Array.from(t.values()));
    const a = n.length;
    let r = 0;
    for (; r < a; ) {
      if (n[r] === e)
        return !0;
      r++;
    }
    return !1;
  }
}
var z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Q(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ne = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    var n = 1e3, a = 6e4, r = 36e5, c = "millisecond", i = "second", s = "minute", o = "hour", b = "day", M = "week", d = "month", u = "quarter", I = "year", O = "date", f = "Invalid Date", S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, P = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, L = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(m) {
      var A = ["th", "st", "nd", "rd"], h = m % 100;
      return "[" + m + (A[(h - 20) % 10] || A[h] || A[0]) + "]";
    } }, D = function(m, A, h) {
      var N = String(m);
      return !N || N.length >= A ? m : "" + Array(A + 1 - N.length).join(h) + m;
    }, Y = { s: D, z: function(m) {
      var A = -m.utcOffset(), h = Math.abs(A), N = Math.floor(h / 60), T = h % 60;
      return (A <= 0 ? "+" : "-") + D(N, 2, "0") + ":" + D(T, 2, "0");
    }, m: function m(A, h) {
      if (A.date() < h.date()) return -m(h, A);
      var N = 12 * (h.year() - A.year()) + (h.month() - A.month()), T = A.clone().add(N, d), $ = h - T < 0, v = A.clone().add(N + ($ ? -1 : 1), d);
      return +(-(N + (h - T) / ($ ? T - v : v - T)) || 0);
    }, a: function(m) {
      return m < 0 ? Math.ceil(m) || 0 : Math.floor(m);
    }, p: function(m) {
      return { M: d, y: I, w: M, d: b, D: O, h: o, m: s, s: i, ms: c, Q: u }[m] || String(m || "").toLowerCase().replace(/s$/, "");
    }, u: function(m) {
      return m === void 0;
    } }, p = "en", _ = {};
    _[p] = L;
    var l = "$isDayjsObject", E = function(m) {
      return m instanceof G || !(!m || !m[l]);
    }, g = function m(A, h, N) {
      var T;
      if (!A) return p;
      if (typeof A == "string") {
        var $ = A.toLowerCase();
        _[$] && (T = $), h && (_[$] = h, T = $);
        var v = A.split("-");
        if (!T && v.length > 1) return m(v[0]);
      } else {
        var U = A.name;
        _[U] = A, T = U;
      }
      return !N && T && (p = T), T || !N && p;
    }, y = function(m, A) {
      if (E(m)) return m.clone();
      var h = typeof A == "object" ? A : {};
      return h.date = m, h.args = arguments, new G(h);
    }, R = Y;
    R.l = g, R.i = E, R.w = function(m, A) {
      return y(m, { locale: A.$L, utc: A.$u, x: A.$x, $offset: A.$offset });
    };
    var G = function() {
      function m(h) {
        this.$L = g(h.locale, null, !0), this.parse(h), this.$x = this.$x || h.x || {}, this[l] = !0;
      }
      var A = m.prototype;
      return A.parse = function(h) {
        this.$d = function(N) {
          var T = N.date, $ = N.utc;
          if (T === null) return /* @__PURE__ */ new Date(NaN);
          if (R.u(T)) return /* @__PURE__ */ new Date();
          if (T instanceof Date) return new Date(T);
          if (typeof T == "string" && !/Z$/i.test(T)) {
            var v = T.match(S);
            if (v) {
              var U = v[2] - 1 || 0, x = (v[7] || "0").substring(0, 3);
              return $ ? new Date(Date.UTC(v[1], U, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, x)) : new Date(v[1], U, v[3] || 1, v[4] || 0, v[5] || 0, v[6] || 0, x);
            }
          }
          return new Date(T);
        }(h), this.init();
      }, A.init = function() {
        var h = this.$d;
        this.$y = h.getFullYear(), this.$M = h.getMonth(), this.$D = h.getDate(), this.$W = h.getDay(), this.$H = h.getHours(), this.$m = h.getMinutes(), this.$s = h.getSeconds(), this.$ms = h.getMilliseconds();
      }, A.$utils = function() {
        return R;
      }, A.isValid = function() {
        return this.$d.toString() !== f;
      }, A.isSame = function(h, N) {
        var T = y(h);
        return this.startOf(N) <= T && T <= this.endOf(N);
      }, A.isAfter = function(h, N) {
        return y(h) < this.startOf(N);
      }, A.isBefore = function(h, N) {
        return this.endOf(N) < y(h);
      }, A.$g = function(h, N, T) {
        return R.u(h) ? this[N] : this.set(T, h);
      }, A.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, A.valueOf = function() {
        return this.$d.getTime();
      }, A.startOf = function(h, N) {
        var T = this, $ = !!R.u(N) || N, v = R.p(h), U = function(q, H) {
          var Z = R.w(T.$u ? Date.UTC(T.$y, H, q) : new Date(T.$y, H, q), T);
          return $ ? Z : Z.endOf(b);
        }, x = function(q, H) {
          return R.w(T.toDate()[q].apply(T.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(H)), T);
        }, C = this.$W, F = this.$M, k = this.$D, V = "set" + (this.$u ? "UTC" : "");
        switch (v) {
          case I:
            return $ ? U(1, 0) : U(31, 11);
          case d:
            return $ ? U(1, F) : U(0, F + 1);
          case M:
            var J = this.$locale().weekStart || 0, ne = (C < J ? C + 7 : C) - J;
            return U($ ? k - ne : k + (6 - ne), F);
          case b:
          case O:
            return x(V + "Hours", 0);
          case o:
            return x(V + "Minutes", 1);
          case s:
            return x(V + "Seconds", 2);
          case i:
            return x(V + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, A.endOf = function(h) {
        return this.startOf(h, !1);
      }, A.$set = function(h, N) {
        var T, $ = R.p(h), v = "set" + (this.$u ? "UTC" : ""), U = (T = {}, T[b] = v + "Date", T[O] = v + "Date", T[d] = v + "Month", T[I] = v + "FullYear", T[o] = v + "Hours", T[s] = v + "Minutes", T[i] = v + "Seconds", T[c] = v + "Milliseconds", T)[$], x = $ === b ? this.$D + (N - this.$W) : N;
        if ($ === d || $ === I) {
          var C = this.clone().set(O, 1);
          C.$d[U](x), C.init(), this.$d = C.set(O, Math.min(this.$D, C.daysInMonth())).$d;
        } else U && this.$d[U](x);
        return this.init(), this;
      }, A.set = function(h, N) {
        return this.clone().$set(h, N);
      }, A.get = function(h) {
        return this[R.p(h)]();
      }, A.add = function(h, N) {
        var T, $ = this;
        h = Number(h);
        var v = R.p(N), U = function(F) {
          var k = y($);
          return R.w(k.date(k.date() + Math.round(F * h)), $);
        };
        if (v === d) return this.set(d, this.$M + h);
        if (v === I) return this.set(I, this.$y + h);
        if (v === b) return U(1);
        if (v === M) return U(7);
        var x = (T = {}, T[s] = a, T[o] = r, T[i] = n, T)[v] || 1, C = this.$d.getTime() + h * x;
        return R.w(C, this);
      }, A.subtract = function(h, N) {
        return this.add(-1 * h, N);
      }, A.format = function(h) {
        var N = this, T = this.$locale();
        if (!this.isValid()) return T.invalidDate || f;
        var $ = h || "YYYY-MM-DDTHH:mm:ssZ", v = R.z(this), U = this.$H, x = this.$m, C = this.$M, F = T.weekdays, k = T.months, V = T.meridiem, J = function(H, Z, ae, fe) {
          return H && (H[Z] || H(N, $)) || ae[Z].slice(0, fe);
        }, ne = function(H) {
          return R.s(U % 12 || 12, H, "0");
        }, q = V || function(H, Z, ae) {
          var fe = H < 12 ? "AM" : "PM";
          return ae ? fe.toLowerCase() : fe;
        };
        return $.replace(P, function(H, Z) {
          return Z || function(ae) {
            switch (ae) {
              case "YY":
                return String(N.$y).slice(-2);
              case "YYYY":
                return R.s(N.$y, 4, "0");
              case "M":
                return C + 1;
              case "MM":
                return R.s(C + 1, 2, "0");
              case "MMM":
                return J(T.monthsShort, C, k, 3);
              case "MMMM":
                return J(k, C);
              case "D":
                return N.$D;
              case "DD":
                return R.s(N.$D, 2, "0");
              case "d":
                return String(N.$W);
              case "dd":
                return J(T.weekdaysMin, N.$W, F, 2);
              case "ddd":
                return J(T.weekdaysShort, N.$W, F, 3);
              case "dddd":
                return F[N.$W];
              case "H":
                return String(U);
              case "HH":
                return R.s(U, 2, "0");
              case "h":
                return ne(1);
              case "hh":
                return ne(2);
              case "a":
                return q(U, x, !0);
              case "A":
                return q(U, x, !1);
              case "m":
                return String(x);
              case "mm":
                return R.s(x, 2, "0");
              case "s":
                return String(N.$s);
              case "ss":
                return R.s(N.$s, 2, "0");
              case "SSS":
                return R.s(N.$ms, 3, "0");
              case "Z":
                return v;
            }
            return null;
          }(H) || v.replace(":", "");
        });
      }, A.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, A.diff = function(h, N, T) {
        var $, v = this, U = R.p(N), x = y(h), C = (x.utcOffset() - this.utcOffset()) * a, F = this - x, k = function() {
          return R.m(v, x);
        };
        switch (U) {
          case I:
            $ = k() / 12;
            break;
          case d:
            $ = k();
            break;
          case u:
            $ = k() / 3;
            break;
          case M:
            $ = (F - C) / 6048e5;
            break;
          case b:
            $ = (F - C) / 864e5;
            break;
          case o:
            $ = F / r;
            break;
          case s:
            $ = F / a;
            break;
          case i:
            $ = F / n;
            break;
          default:
            $ = F;
        }
        return T ? $ : R.a($);
      }, A.daysInMonth = function() {
        return this.endOf(d).$D;
      }, A.$locale = function() {
        return _[this.$L];
      }, A.locale = function(h, N) {
        if (!h) return this.$L;
        var T = this.clone(), $ = g(h, N, !0);
        return $ && (T.$L = $), T;
      }, A.clone = function() {
        return R.w(this.$d, this);
      }, A.toDate = function() {
        return new Date(this.valueOf());
      }, A.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, A.toISOString = function() {
        return this.$d.toISOString();
      }, A.toString = function() {
        return this.$d.toUTCString();
      }, m;
    }(), B = G.prototype;
    return y.prototype = B, [["$ms", c], ["$s", i], ["$m", s], ["$H", o], ["$W", b], ["$M", d], ["$y", I], ["$D", O]].forEach(function(m) {
      B[m[1]] = function(A) {
        return this.$g(A, m[0], m[1]);
      };
    }), y.extend = function(m, A) {
      return m.$i || (m(A, G, y), m.$i = !0), y;
    }, y.locale = g, y.isDayjs = E, y.unix = function(m) {
      return y(1e3 * m);
    }, y.en = _[p], y.Ls = _, y.p = {}, y;
  });
})(Ne);
var ct = Ne.exports;
const w = /* @__PURE__ */ Q(ct);
var Me = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    var n = "minute", a = /[+-]\d\d(?::?\d\d)?/g, r = /([+-]|\d\d)/g;
    return function(c, i, s) {
      var o = i.prototype;
      s.utc = function(f) {
        var S = { date: f, utc: !0, args: arguments };
        return new i(S);
      }, o.utc = function(f) {
        var S = s(this.toDate(), { locale: this.$L, utc: !0 });
        return f ? S.add(this.utcOffset(), n) : S;
      }, o.local = function() {
        return s(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var b = o.parse;
      o.parse = function(f) {
        f.utc && (this.$u = !0), this.$utils().u(f.$offset) || (this.$offset = f.$offset), b.call(this, f);
      };
      var M = o.init;
      o.init = function() {
        if (this.$u) {
          var f = this.$d;
          this.$y = f.getUTCFullYear(), this.$M = f.getUTCMonth(), this.$D = f.getUTCDate(), this.$W = f.getUTCDay(), this.$H = f.getUTCHours(), this.$m = f.getUTCMinutes(), this.$s = f.getUTCSeconds(), this.$ms = f.getUTCMilliseconds();
        } else M.call(this);
      };
      var d = o.utcOffset;
      o.utcOffset = function(f, S) {
        var P = this.$utils().u;
        if (P(f)) return this.$u ? 0 : P(this.$offset) ? d.call(this) : this.$offset;
        if (typeof f == "string" && (f = function(p) {
          p === void 0 && (p = "");
          var _ = p.match(a);
          if (!_) return null;
          var l = ("" + _[0]).match(r) || ["-", 0, 0], E = l[0], g = 60 * +l[1] + +l[2];
          return g === 0 ? 0 : E === "+" ? g : -g;
        }(f), f === null)) return this;
        var L = Math.abs(f) <= 16 ? 60 * f : f, D = this;
        if (S) return D.$offset = L, D.$u = f === 0, D;
        if (f !== 0) {
          var Y = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (D = this.local().add(L + Y, n)).$offset = L, D.$x.$localOffset = Y;
        } else D = this.utc();
        return D;
      };
      var u = o.format;
      o.format = function(f) {
        var S = f || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return u.call(this, S);
      }, o.valueOf = function() {
        var f = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * f;
      }, o.isUTC = function() {
        return !!this.$u;
      }, o.toISOString = function() {
        return this.toDate().toISOString();
      }, o.toString = function() {
        return this.toDate().toUTCString();
      };
      var I = o.toDate;
      o.toDate = function(f) {
        return f === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : I.call(this);
      };
      var O = o.diff;
      o.diff = function(f, S, P) {
        if (f && this.$u === f.$u) return O.call(this, f, S, P);
        var L = this.local(), D = s(f).local();
        return O.call(L, D, S, P);
      };
    };
  });
})(Me);
var it = Me.exports;
const st = /* @__PURE__ */ Q(it);
var Oe = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    var n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, a = {};
    return function(r, c, i) {
      var s, o = function(u, I, O) {
        O === void 0 && (O = {});
        var f = new Date(u), S = function(P, L) {
          L === void 0 && (L = {});
          var D = L.timeZoneName || "short", Y = P + "|" + D, p = a[Y];
          return p || (p = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: P, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: D }), a[Y] = p), p;
        }(I, O);
        return S.formatToParts(f);
      }, b = function(u, I) {
        for (var O = o(u, I), f = [], S = 0; S < O.length; S += 1) {
          var P = O[S], L = P.type, D = P.value, Y = n[L];
          Y >= 0 && (f[Y] = parseInt(D, 10));
        }
        var p = f[3], _ = p === 24 ? 0 : p, l = f[0] + "-" + f[1] + "-" + f[2] + " " + _ + ":" + f[4] + ":" + f[5] + ":000", E = +u;
        return (i.utc(l).valueOf() - (E -= E % 1e3)) / 6e4;
      }, M = c.prototype;
      M.tz = function(u, I) {
        u === void 0 && (u = s);
        var O = this.utcOffset(), f = this.toDate(), S = f.toLocaleString("en-US", { timeZone: u }), P = Math.round((f - new Date(S)) / 1e3 / 60), L = i(S, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(f.getTimezoneOffset() / 15) - P, !0);
        if (I) {
          var D = L.utcOffset();
          L = L.add(O - D, "minute");
        }
        return L.$x.$timezone = u, L;
      }, M.offsetName = function(u) {
        var I = this.$x.$timezone || i.tz.guess(), O = o(this.valueOf(), I, { timeZoneName: u }).find(function(f) {
          return f.type.toLowerCase() === "timezonename";
        });
        return O && O.value;
      };
      var d = M.startOf;
      M.startOf = function(u, I) {
        if (!this.$x || !this.$x.$timezone) return d.call(this, u, I);
        var O = i(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
        return d.call(O, u, I).tz(this.$x.$timezone, !0);
      }, i.tz = function(u, I, O) {
        var f = O && I, S = O || I || s, P = b(+i(), S);
        if (typeof u != "string") return i(u).tz(S);
        var L = function(_, l, E) {
          var g = _ - 60 * l * 1e3, y = b(g, E);
          if (l === y) return [g, l];
          var R = b(g -= 60 * (y - l) * 1e3, E);
          return y === R ? [g, y] : [_ - 60 * Math.min(y, R) * 1e3, Math.max(y, R)];
        }(i.utc(u, f).valueOf(), P, S), D = L[0], Y = L[1], p = i(D).utcOffset(Y);
        return p.$x.$timezone = S, p;
      }, i.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, i.tz.setDefault = function(u) {
        s = u;
      };
    };
  });
})(Oe);
var ft = Oe.exports;
const ut = /* @__PURE__ */ Q(ft);
var Pe = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    var n, a, r = 1e3, c = 6e4, i = 36e5, s = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = 31536e6, M = 2628e6, d = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, u = { years: b, months: M, days: s, hours: i, minutes: c, seconds: r, milliseconds: 1, weeks: 6048e5 }, I = function(_) {
      return _ instanceof Y;
    }, O = function(_, l, E) {
      return new Y(_, E, l.$l);
    }, f = function(_) {
      return a.p(_) + "s";
    }, S = function(_) {
      return _ < 0;
    }, P = function(_) {
      return S(_) ? Math.ceil(_) : Math.floor(_);
    }, L = function(_) {
      return Math.abs(_);
    }, D = function(_, l) {
      return _ ? S(_) ? { negative: !0, format: "" + L(_) + l } : { negative: !1, format: "" + _ + l } : { negative: !1, format: "" };
    }, Y = function() {
      function _(E, g, y) {
        var R = this;
        if (this.$d = {}, this.$l = y, E === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), g) return O(E * u[f(g)], this);
        if (typeof E == "number") return this.$ms = E, this.parseFromMilliseconds(), this;
        if (typeof E == "object") return Object.keys(E).forEach(function(m) {
          R.$d[f(m)] = E[m];
        }), this.calMilliseconds(), this;
        if (typeof E == "string") {
          var G = E.match(d);
          if (G) {
            var B = G.slice(2).map(function(m) {
              return m != null ? Number(m) : 0;
            });
            return this.$d.years = B[0], this.$d.months = B[1], this.$d.weeks = B[2], this.$d.days = B[3], this.$d.hours = B[4], this.$d.minutes = B[5], this.$d.seconds = B[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var l = _.prototype;
      return l.calMilliseconds = function() {
        var E = this;
        this.$ms = Object.keys(this.$d).reduce(function(g, y) {
          return g + (E.$d[y] || 0) * u[y];
        }, 0);
      }, l.parseFromMilliseconds = function() {
        var E = this.$ms;
        this.$d.years = P(E / b), E %= b, this.$d.months = P(E / M), E %= M, this.$d.days = P(E / s), E %= s, this.$d.hours = P(E / i), E %= i, this.$d.minutes = P(E / c), E %= c, this.$d.seconds = P(E / r), E %= r, this.$d.milliseconds = E;
      }, l.toISOString = function() {
        var E = D(this.$d.years, "Y"), g = D(this.$d.months, "M"), y = +this.$d.days || 0;
        this.$d.weeks && (y += 7 * this.$d.weeks);
        var R = D(y, "D"), G = D(this.$d.hours, "H"), B = D(this.$d.minutes, "M"), m = this.$d.seconds || 0;
        this.$d.milliseconds && (m += this.$d.milliseconds / 1e3, m = Math.round(1e3 * m) / 1e3);
        var A = D(m, "S"), h = E.negative || g.negative || R.negative || G.negative || B.negative || A.negative, N = G.format || B.format || A.format ? "T" : "", T = (h ? "-" : "") + "P" + E.format + g.format + R.format + N + G.format + B.format + A.format;
        return T === "P" || T === "-P" ? "P0D" : T;
      }, l.toJSON = function() {
        return this.toISOString();
      }, l.format = function(E) {
        var g = E || "YYYY-MM-DDTHH:mm:ss", y = { Y: this.$d.years, YY: a.s(this.$d.years, 2, "0"), YYYY: a.s(this.$d.years, 4, "0"), M: this.$d.months, MM: a.s(this.$d.months, 2, "0"), D: this.$d.days, DD: a.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: a.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: a.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: a.s(this.$d.seconds, 2, "0"), SSS: a.s(this.$d.milliseconds, 3, "0") };
        return g.replace(o, function(R, G) {
          return G || String(y[R]);
        });
      }, l.as = function(E) {
        return this.$ms / u[f(E)];
      }, l.get = function(E) {
        var g = this.$ms, y = f(E);
        return y === "milliseconds" ? g %= 1e3 : g = y === "weeks" ? P(g / u[y]) : this.$d[y], g || 0;
      }, l.add = function(E, g, y) {
        var R;
        return R = g ? E * u[f(g)] : I(E) ? E.$ms : O(E, this).$ms, O(this.$ms + R * (y ? -1 : 1), this);
      }, l.subtract = function(E, g) {
        return this.add(E, g, !0);
      }, l.locale = function(E) {
        var g = this.clone();
        return g.$l = E, g;
      }, l.clone = function() {
        return O(this.$ms, this);
      }, l.humanize = function(E) {
        return n().add(this.$ms, "ms").locale(this.$l).fromNow(!E);
      }, l.valueOf = function() {
        return this.asMilliseconds();
      }, l.milliseconds = function() {
        return this.get("milliseconds");
      }, l.asMilliseconds = function() {
        return this.as("milliseconds");
      }, l.seconds = function() {
        return this.get("seconds");
      }, l.asSeconds = function() {
        return this.as("seconds");
      }, l.minutes = function() {
        return this.get("minutes");
      }, l.asMinutes = function() {
        return this.as("minutes");
      }, l.hours = function() {
        return this.get("hours");
      }, l.asHours = function() {
        return this.as("hours");
      }, l.days = function() {
        return this.get("days");
      }, l.asDays = function() {
        return this.as("days");
      }, l.weeks = function() {
        return this.get("weeks");
      }, l.asWeeks = function() {
        return this.as("weeks");
      }, l.months = function() {
        return this.get("months");
      }, l.asMonths = function() {
        return this.as("months");
      }, l.years = function() {
        return this.get("years");
      }, l.asYears = function() {
        return this.as("years");
      }, _;
    }(), p = function(_, l, E) {
      return _.add(l.years() * E, "y").add(l.months() * E, "M").add(l.days() * E, "d").add(l.hours() * E, "h").add(l.minutes() * E, "m").add(l.seconds() * E, "s").add(l.milliseconds() * E, "ms");
    };
    return function(_, l, E) {
      n = E, a = E().$utils(), E.duration = function(R, G) {
        var B = E.locale();
        return O(R, { $l: B }, G);
      }, E.isDuration = I;
      var g = l.prototype.add, y = l.prototype.subtract;
      l.prototype.add = function(R, G) {
        return I(R) ? p(this, R, 1) : g.bind(this)(R, G);
      }, l.prototype.subtract = function(R, G) {
        return I(R) ? p(this, R, -1) : y.bind(this)(R, G);
      };
    };
  });
})(Pe);
var ot = Pe.exports;
const Et = /* @__PURE__ */ Q(ot);
var ye = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a, r) {
      n = n || {};
      var c = a.prototype, i = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function s(b, M, d, u) {
        return c.fromToBase(b, M, d, u);
      }
      r.en.relativeTime = i, c.fromToBase = function(b, M, d, u, I) {
        for (var O, f, S, P = d.$locale().relativeTime || i, L = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], D = L.length, Y = 0; Y < D; Y += 1) {
          var p = L[Y];
          p.d && (O = u ? r(b).diff(d, p.d, !0) : d.diff(b, p.d, !0));
          var _ = (n.rounding || Math.round)(Math.abs(O));
          if (S = O > 0, _ <= p.r || !p.r) {
            _ <= 1 && Y > 0 && (p = L[Y - 1]);
            var l = P[p.l];
            I && (_ = I("" + _)), f = typeof l == "string" ? l.replace("%d", _) : l(_, M, p.l, S);
            break;
          }
        }
        if (M) return f;
        var E = S ? P.future : P.past;
        return typeof E == "function" ? E(f) : E.replace("%s", f);
      }, c.to = function(b, M) {
        return s(b, M, this, !0);
      }, c.from = function(b, M) {
        return s(b, M, this);
      };
      var o = function(b) {
        return b.$u ? r.utc() : r();
      };
      c.toNow = function(b) {
        return this.to(o(this), b);
      }, c.fromNow = function(b) {
        return this.from(o(this), b);
      };
    };
  });
})(ye);
var bt = ye.exports;
const lt = /* @__PURE__ */ Q(bt);
var Le = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a, r) {
      var c = a.prototype, i = function(o) {
        var b = o.date, M = o.utc;
        return Array.isArray(b) ? M ? b.length ? new Date(Date.UTC.apply(null, b)) : /* @__PURE__ */ new Date() : b.length === 1 ? r(String(b[0])).toDate() : new (Function.prototype.bind.apply(Date, [null].concat(b)))() : b;
      }, s = c.parse;
      c.parse = function(o) {
        o.date = i.bind(this)(o), s.bind(this)(o);
      };
    };
  });
})(Le);
var dt = Le.exports;
const ht = /* @__PURE__ */ Q(dt);
var ge = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a, r) {
      var c = a.prototype, i = function(u) {
        var I, O = u.date, f = u.utc, S = {};
        if (!((I = O) === null || I instanceof Date || I instanceof Array || c.$utils().u(I) || I.constructor.name !== "Object")) {
          if (!Object.keys(O).length) return /* @__PURE__ */ new Date();
          var P = f ? r.utc() : r();
          Object.keys(O).forEach(function(g) {
            var y, R;
            S[y = g, R = c.$utils().p(y), R === "date" ? "day" : R] = O[g];
          });
          var L = S.day || (S.year || S.month >= 0 ? 1 : P.date()), D = S.year || P.year(), Y = S.month >= 0 ? S.month : S.year || S.day ? 0 : P.month(), p = S.hour || 0, _ = S.minute || 0, l = S.second || 0, E = S.millisecond || 0;
          return f ? new Date(Date.UTC(D, Y, L, p, _, l, E)) : new Date(D, Y, L, p, _, l, E);
        }
        return O;
      }, s = c.parse;
      c.parse = function(u) {
        u.date = i.bind(this)(u), s.bind(this)(u);
      };
      var o = c.set, b = c.add, M = c.subtract, d = function(u, I, O, f) {
        f === void 0 && (f = 1);
        var S = Object.keys(I), P = this;
        return S.forEach(function(L) {
          P = u.bind(P)(I[L] * f, L);
        }), P;
      };
      c.set = function(u, I) {
        return I = I === void 0 ? u : I, u.constructor.name === "Object" ? d.bind(this)(function(O, f) {
          return o.bind(this)(f, O);
        }, I, u) : o.bind(this)(u, I);
      }, c.add = function(u, I) {
        return u.constructor.name === "Object" ? d.bind(this)(b, u, I) : b.bind(this)(u, I);
      }, c.subtract = function(u, I) {
        return u.constructor.name === "Object" ? d.bind(this)(b, u, I, -1) : M.bind(this)(u, I);
      };
    };
  });
})(ge);
var _t = ge.exports;
const Tt = /* @__PURE__ */ Q(_t);
var pe = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a) {
      a.prototype.isSameOrAfter = function(r, c) {
        return this.isSame(r, c) || this.isAfter(r, c);
      };
    };
  });
})(pe);
var At = pe.exports;
const It = /* @__PURE__ */ Q(At);
var De = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a) {
      a.prototype.isSameOrBefore = function(r, c) {
        return this.isSame(r, c) || this.isBefore(r, c);
      };
    };
  });
})(De);
var St = De.exports;
const Rt = /* @__PURE__ */ Q(St);
var $e = { exports: {} };
(function(e, t) {
  (function(n, a) {
    e.exports = a();
  })(z, function() {
    return function(n, a, r) {
      a.prototype.isBetween = function(c, i, s, o) {
        var b = r(c), M = r(i), d = (o = o || "()")[0] === "(", u = o[1] === ")";
        return (d ? this.isAfter(b, s) : !this.isBefore(b, s)) && (u ? this.isBefore(M, s) : !this.isAfter(M, s)) || (d ? this.isBefore(b, s) : !this.isAfter(b, s)) && (u ? this.isAfter(M, s) : !this.isBefore(M, s));
      };
    };
  });
})($e);
var mt = $e.exports;
const Nt = /* @__PURE__ */ Q(mt);
w.extend(st);
w.extend(ut);
w.extend(Et);
w.extend(lt);
w.extend(ht);
w.extend(Tt);
w.extend(It);
w.extend(Rt);
w.extend(Nt);
const ue = /* @__PURE__ */ new Set();
try {
  const e = Intl.supportedValuesOf("timeZone");
  for (const t of e)
    e.add(t);
} catch (e) {
  console.error(e), ue.add("America/Los_Angeles"), ue.add("America/New_York"), ue.add("Asia/Korea");
}
const j = class j {
  /**
   * 현재 시간을 가져옵니다.
   */
  get now() {
    return w();
  }
  /**
   * 현재 시간을 타임존을 적용하여 가져옵니다.
   */
  get nowTz() {
    return w().tz(j.timezone);
  }
  /**
   * 현재 시간을 UTC로 가져옵니다.
   */
  get nowUTC() {
    return w().utc();
  }
  /**
   * 현재 시간을 타임존을 적용후 UTC를 재 적용하여 가져옵니다.
   */
  get nowTzUtc() {
    return w().tz(j.timezone).utc();
  }
  /**
   * duration 객체를 가져옵니다.
   */
  get duration() {
    return w.duration;
  }
  /**
   * 타임존을 설정합니다.
   * @param timezone
   * @returns boolean
   * @throws Error 타임존이 잘못된 경우
   */
  setTimeZone(t) {
    if (!ue.has(t))
      throw new Error(`Invalid timezone ${t}`);
    return !0;
  }
};
W(j, "timezone", "America/Los_Angeles"), /** 밀리세컨드 */
W(j, "milliseconds", w.duration(1, "millisecond").asMilliseconds()), /** 초 (단위 밀리세컨드) */
W(j, "seconds", w.duration(1, "second").asMilliseconds()), /** 분 (단위 밀리세컨드) */
W(j, "minutes", w.duration(1, "minute").asMilliseconds()), /** 시간 (단위 밀리세컨드) */
W(j, "hours", w.duration(1, "hour").asMilliseconds()), /** 일 (단위 밀리세컨드) */
W(j, "days", w.duration(1, "day").asMilliseconds()), /** 주 (단위 밀리세컨드) */
W(j, "weeks", w.duration(1, "week").asMilliseconds()), /** 월 (단위 밀리세컨드) */
W(j, "months", w.duration(1, "month").asMilliseconds()), /** 년 (단위 밀리세컨드) */
W(j, "years", w.duration(1, "year").asMilliseconds());
let _e = j;
const kn = at;
var Mt = typeof global == "object" && global && global.Object === Object && global, Ot = typeof self == "object" && self && self.Object === Object && self, ve = Mt || Ot || Function("return this")(), Ee = ve.Symbol, Ye = Object.prototype, Pt = Ye.hasOwnProperty, yt = Ye.toString, re = Ee ? Ee.toStringTag : void 0;
function Lt(e) {
  var t = Pt.call(e, re), n = e[re];
  try {
    e[re] = void 0;
    var a = !0;
  } catch {
  }
  var r = yt.call(e);
  return a && (t ? e[re] = n : delete e[re]), r;
}
var gt = Object.prototype, pt = gt.toString;
function Dt(e) {
  return pt.call(e);
}
var $t = "[object Null]", vt = "[object Undefined]", Te = Ee ? Ee.toStringTag : void 0;
function Yt(e) {
  return e == null ? e === void 0 ? vt : $t : Te && Te in Object(e) ? Lt(e) : Dt(e);
}
function Ut(e) {
  return e != null && typeof e == "object";
}
var wt = "[object Symbol]";
function xt(e) {
  return typeof e == "symbol" || Ut(e) && Yt(e) == wt;
}
var Gt = /\s/;
function Ct(e) {
  for (var t = e.length; t-- && Gt.test(e.charAt(t)); )
    ;
  return t;
}
var Bt = /^\s+/;
function Ft(e) {
  return e && e.slice(0, Ct(e) + 1).replace(Bt, "");
}
function be(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ae = NaN, Ht = /^[-+]0x[0-9a-f]+$/i, jt = /^0b[01]+$/i, kt = /^0o[0-7]+$/i, Wt = parseInt;
function Ie(e) {
  if (typeof e == "number")
    return e;
  if (xt(e))
    return Ae;
  if (be(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = be(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Ft(e);
  var n = jt.test(e);
  return n || kt.test(e) ? Wt(e.slice(2), n ? 2 : 8) : Ht.test(e) ? Ae : +e;
}
var de = function() {
  return ve.Date.now();
}, zt = "Expected a function", Qt = Math.max, Zt = Math.min;
function Kt(e, t, n) {
  var a, r, c, i, s, o, b = 0, M = !1, d = !1, u = !0;
  if (typeof e != "function")
    throw new TypeError(zt);
  t = Ie(t) || 0, be(n) && (M = !!n.leading, d = "maxWait" in n, c = d ? Qt(Ie(n.maxWait) || 0, t) : c, u = "trailing" in n ? !!n.trailing : u);
  function I(_) {
    var l = a, E = r;
    return a = r = void 0, b = _, i = e.apply(E, l), i;
  }
  function O(_) {
    return b = _, s = setTimeout(P, t), M ? I(_) : i;
  }
  function f(_) {
    var l = _ - o, E = _ - b, g = t - l;
    return d ? Zt(g, c - E) : g;
  }
  function S(_) {
    var l = _ - o, E = _ - b;
    return o === void 0 || l >= t || l < 0 || d && E >= c;
  }
  function P() {
    var _ = de();
    if (S(_))
      return L(_);
    s = setTimeout(P, f(_));
  }
  function L(_) {
    return s = void 0, u && a ? I(_) : (a = r = void 0, i);
  }
  function D() {
    s !== void 0 && clearTimeout(s), b = 0, a = o = r = s = void 0;
  }
  function Y() {
    return s === void 0 ? i : L(de());
  }
  function p() {
    var _ = de(), l = S(_);
    if (a = arguments, r = this, o = _, l) {
      if (s === void 0)
        return O(o);
      if (d)
        return clearTimeout(s), s = setTimeout(P, t), I(o);
    }
    return s === void 0 && (s = setTimeout(P, t)), i;
  }
  return p.cancel = D, p.flush = Y, p;
}
var Xt = "Expected a function";
function Jt(e, t, n) {
  var a = !0, r = !0;
  if (typeof e != "function")
    throw new TypeError(Xt);
  return be(n) && (a = "leading" in n ? !!n.leading : a, r = "trailing" in n ? !!n.trailing : r), Kt(e, t, {
    leading: a,
    maxWait: t,
    trailing: r
  });
}
const Wn = Jt, zn = nt;
function Qn(e, t, n) {
  if (!en(e, t, n))
    throw n ? new Error("value의 타입과 start, end의 타입이 같아야 합니다.") : new Error("value의 타입과 start의 타입이 같아야 합니다.");
  return typeof e == "number" ? qt(e, t, n) : e instanceof Date ? Vt(e, t, n) : !1;
}
function qt(e, t, n) {
  return n === void 0 && (n = t, t = 0), t > n && ([t, n] = [n, t]), e >= t && e < n;
}
function Vt(e, t, n) {
  return n === void 0 && (n = t, t = /* @__PURE__ */ new Date(0)), t > n && ([t, n] = [n, t]), e >= t && e < n;
}
function en(e, t, n) {
  return typeof e == "number" && typeof t == "number" && (n === void 0 || typeof n == "number") || e instanceof Date && t instanceof Date && (n === void 0 || n instanceof Date);
}
async function Zn(e) {
  return new Promise((t) => setTimeout(t, e / 1e3));
}
function tn(e, t, n) {
  let a = e == null ? 0 : e.length;
  if (!a)
    return [];
  t = t ?? 0, n = n === void 0 ? a : n, t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
  let r = -1;
  const c = new Array(a);
  for (; ++r < a; )
    c[r] = e[r + t];
  return c;
}
function Kn(e, t) {
  t = Math.max(t, 0);
  const n = e == null ? 0 : e.length;
  if (!n || t < 1)
    return [];
  let a = 0, r = 0;
  const c = new Array(Math.ceil(n / t));
  for (; a < n; )
    c[r++] = tn(e, a, a += t);
  return c;
}
const nn = (e) => {
  let t = [];
  for (const n of e)
    Array.isArray(n) ? t.push(oe(n)) : t.push(n);
  return t;
};
function oe(e) {
  if (typeof e != "object" || e === null || typeof e == "function" || e instanceof WeakMap || e instanceof WeakSet)
    return e;
  if (typeof e == "symbol")
    throw new Error("Symbol은 복사할 수 없습니다.");
  if (e instanceof Date)
    return new Date(e);
  if (e instanceof RegExp)
    return new RegExp(e.source, e.flags);
  if (Array.isArray(e))
    return Object.assign([], nn(e));
  if (e instanceof Map) {
    const t = Array.from(e, ([a, r]) => [oe(a), oe(r)]);
    return new Map(t);
  }
  if (e instanceof Set) {
    const t = Array.from(e).map((n) => oe(n));
    return new Set(t);
  }
  return Object.assign({}, e);
}
function Xn(e, t) {
  if (!X(e) || !ee(t) || !K(e)) return e;
  const n = e.length, a = new Array(n);
  let r = 0, c = 0;
  for (c = 0; c < n; c++) {
    const i = e[c];
    t(i, c, e) && (a[r++] = i);
  }
  return a.length = r, a;
}
function Jn(e, t) {
  if (!X(e) || !ee(t) || !K(e)) return e;
  const n = e.length, a = new Array(n);
  let r = 0;
  for (r = 0; r < n; r++)
    a[r] = t(e[r], r, e);
  return a;
}
function qn(e, t, n) {
  if (!X(e) || !ee(t) || K(e)) return n;
  let a = n, r = 0;
  for (const c of e)
    a = t(a, c, r, e), r++;
  return a;
}
function Vn(e, t) {
  if (X(e) && ee(t) && !K(e)) {
    for (const n of e)
      if (t(n))
        return n;
  }
}
function ea(e, t) {
  if (!X(e) || !ee(t) || !K(e)) return -1;
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
  return -1;
}
function ta(e, t) {
  if (!X(e) || !ee(t) || !K(e)) return e;
  const n = e.length, a = new Array(n);
  let r = 0, c = 0, i = 0;
  for (; c < n; ) {
    const s = t(e[c], c, e);
    if (Array.isArray(s)) {
      const o = s.length;
      for (i = 0; i < o; )
        a[r++] = s[i], i++;
    } else
      a[r++] = s;
    c++;
  }
  return a.length = r, a;
}
const Ue = 1;
function na(e, t) {
  return !X(e) || !K(e) ? e : K(t) || t === Ue ? an(e) : rn(e, t);
}
function an(e) {
  const t = [], n = e.length;
  let a = 0, r = 0;
  for (; a < n; ) {
    const c = e[a];
    if (Array.isArray(c)) {
      const i = c.length;
      let s = 0;
      for (; s < i; )
        t[r++] = c[s], s++;
    } else
      t[r++] = c;
    a++;
  }
  return t;
}
function rn(e, t = Ue) {
  const n = [];
  let a = 0;
  const r = [];
  for (a = e.length - 1; a >= 0; a--)
    r.push({ value: e[a], depth: t });
  for (; r.length > 0; ) {
    const c = r.pop();
    if (!c)
      continue;
    const { value: i, depth: s } = c;
    if (Array.isArray(i) && s > 0)
      for (let o = i.length - 1; o >= 0; o--)
        r.push({ value: i[o], depth: s - 1 });
    else
      n.push(i);
  }
  return n;
}
function aa(e, t) {
  if (!X(e))
    throw new TypeError("First argument must be an array");
  if (typeof t != "function")
    throw new TypeError("Second argument must be a function");
  const n = /* @__PURE__ */ Object.create(null), a = e.length;
  for (let r = 0; r < a; r++) {
    const c = e[r], i = t(c);
    if (typeof i != "string" && typeof i != "number" && typeof i != "symbol")
      throw new TypeError("Key function must return a string, number, or symbol");
    (n[i] || (n[i] = [])).push(c);
  }
  return n;
}
function ra(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = [], a = ((r = e[0]) == null ? void 0 : r.codeParentId) ?? null;
  return e.forEach((c) => {
    const i = { ...c, children: [] };
    t.set(c.codeId, i);
  }), e.forEach((c) => {
    const i = t.get(c.codeId);
    if (c.codeParentId !== a) {
      const s = t.get(c.codeParentId);
      s ? s.children.push(i) : n.push(i);
    } else
      n.push(i);
  }), n;
}
function cn(e) {
  if (e.codeCustomText)
    try {
      e.codeCustomText = JSON.parse(e.codeCustomText);
    } catch {
    }
  e.children.forEach(cn);
}
function sn(e, t, n, a, r) {
  return (c, i) => {
    for (let s = 0; s < e; s++) {
      let o = t[c][s];
      o === void 0 && (o = n[s](a[c]), t[c][s] = o);
      let b = t[i][s];
      if (b === void 0 && (b = n[s](a[i]), t[i][s] = b), o !== b)
        return (o > b ? 1 : -1) * r[s];
    }
    return 0;
  };
}
function ca(e, t, n) {
  if (!Array.isArray(e))
    throw new TypeError("첫 번째 인자는 반드시 배열이어야 합니다");
  const a = e.length, r = t.length, c = new Int32Array(a);
  for (let d = 0; d < a; d++)
    c[d] = d;
  const i = new Array(r), s = new Int8Array(r);
  for (let d = 0; d < r; d++) {
    const u = t[d];
    typeof u == "function" ? i[d] = u : i[d] = (I) => I[u], s[d] = n && n[d] === "desc" ? -1 : 1;
  }
  const o = new Array(a);
  for (let d = 0; d < a; d++)
    o[d] = new Array(r);
  const b = sn(r, o, i, e, s);
  c.sort(b);
  const M = new Array(a);
  for (let d = 0; d < a; d++)
    M[d] = e[c[d]];
  return M;
}
function we(e, ...t) {
  const n = [];
  let a = 0, r = 0, c = e.indexOf("{:}", a);
  for (; c >= 0; ) {
    if (c > 0 && e[c - 1] === "\\") {
      n.push(e.slice(a, c - 1), "{:}"), a = c + 3;
      continue;
    }
    if (n.push(e.slice(a, c)), r >= t.length)
      throw new Error(`Missing argument for placeholder at index ${c}`);
    const i = t[r++];
    n.push(i != null ? String(i) : ""), a = c + 3, c = e.indexOf("{:}", a);
  }
  return n.push(e.slice(a)), r < t.length && console.warn(`${t.length - r} extra argument(s) provided`), n.join("");
}
const fn = /(\S+)|(.)/g, un = new RegExp("[\\.#]\\p{Alphabetic}", "u"), on = new RegExp("\\p{Ll}(?=[\\p{Lu}])", "u"), En = new RegExp("\\p{Alphabetic}+", "gu"), bn = new RegExp("^(\\P{Alphabetic})*(?:\\p{Alphabetic}\\.){2,}(\\P{Alphabetic})*$", "u"), ln = /* @__PURE__ */ new Set(["—", "–", "-", "―", "/"]), xe = /* @__PURE__ */ new Set([".", "!", "?"]), dn = /* @__PURE__ */ new Set([...xe, ":", '"', "'", "”"]), hn = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "because",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "neither",
  "nor",
  "of",
  "on",
  "only",
  "or",
  "over",
  "per",
  "so",
  "some",
  "than",
  "that",
  "the",
  "to",
  "up",
  "upon",
  "v",
  "versus",
  "via",
  "vs",
  "when",
  "with",
  "without",
  "yet"
]);
function _n(e, t = {}) {
  const {
    locale: n = void 0,
    sentenceCase: a = !1,
    sentenceTerminators: r = xe,
    titleTerminators: c = dn,
    smallWords: i = hn,
    wordSeparators: s = ln
  } = typeof t == "string" || Array.isArray(t) ? { locale: t } : t, o = a ? r : c;
  let b = "", M = !0;
  for (const d of e.matchAll(fn)) {
    const { 1: u, 2: I, index: O = 0 } = d;
    if (I) {
      b += I;
      continue;
    }
    if (un.test(u)) {
      const f = u.match(bn);
      if (f) {
        const [S, P = "", L = ""] = f;
        b += a && !M ? u : Se(u, P.length, n), M = o.has(L.charAt(0));
        continue;
      }
      b += u, M = o.has(u.charAt(u.length - 1));
    } else {
      const f = Array.from(u.matchAll(En));
      let S = u, P = !1;
      for (let L = 0; L < f.length; L++) {
        const { 0: D, index: Y = 0 } = f[L], p = u.charAt(Y + D.length);
        if (P = o.has(p), M)
          M = !1;
        else {
          if (a || on.test(D))
            continue;
          if (f.length === 1) {
            if (i.has(D) && !(O + u.length === e.length) && !P)
              continue;
          } else if (L > 0 && (!s.has(u.charAt(Y - 1)) || i.has(D) && s.has(p)))
            continue;
        }
        S = Se(S, Y, n);
      }
      b += S, M = P || o.has(u.charAt(u.length - 1));
    }
  }
  return b;
}
function Se(e, t, n) {
  return e.slice(0, t) + e.charAt(t).toLocaleUpperCase(n) + e.slice(t + 1);
}
const Tn = new RegExp("([\\p{Ll}\\d])(\\p{Lu})", "gu"), An = new RegExp("(\\p{Lu})([\\p{Lu}][\\p{Ll}])", "gu"), In = new RegExp("(\\d)\\p{Ll}|(\\p{L})\\d", "u"), Sn = /[^\p{L}\d]+/giu, Re = "$1\0$2", me = "";
function Ge(e) {
  let t = e.trim();
  t = t.replace(Tn, Re).replace(An, Re), t = t.replace(Sn, "\0");
  let n = 0, a = t.length;
  for (; t.charAt(n) === "\0"; ) n++;
  if (n === a) return [];
  for (; t.charAt(a - 1) === "\0"; ) a--;
  return t.slice(n, a).split(/\0/g);
}
function Rn(e) {
  const t = Ge(e);
  for (let n = 0; n < t.length; n++) {
    const a = t[n], r = In.exec(a);
    if (r) {
      const c = r.index + (r[1] ?? r[2]).length;
      t.splice(n, 1, a.slice(0, c), a.slice(c));
    }
  }
  return t;
}
function ce(e, t) {
  const [n, a, r] = te(e, t);
  return n + a.map(ie(t == null ? void 0 : t.locale)).join((t == null ? void 0 : t.delimiter) ?? " ") + r;
}
function mn(e, t) {
  const [n, a, r] = te(e, t), c = ie(t == null ? void 0 : t.locale), i = se(t == null ? void 0 : t.locale), s = t != null && t.mergeAmbiguousCharacters ? le(c, i) : Ce(c, i);
  return n + a.map((o, b) => b === 0 ? c(o) : s(o, b)).join((t == null ? void 0 : t.delimiter) ?? "") + r;
}
function Nn(e, t) {
  const [n, a, r] = te(e, t), c = ie(t == null ? void 0 : t.locale), i = se(t == null ? void 0 : t.locale), s = t != null && t.mergeAmbiguousCharacters ? le(c, i) : Ce(c, i);
  return n + a.map(s).join((t == null ? void 0 : t.delimiter) ?? "") + r;
}
function Mn(e, t) {
  return he(e, { delimiter: "_", ...t });
}
function he(e, t) {
  const [n, a, r] = te(e, t), c = ie(t == null ? void 0 : t.locale), i = se(t == null ? void 0 : t.locale);
  return n + a.map(le(c, i)).join((t == null ? void 0 : t.delimiter) ?? " ") + r;
}
function On(e, t) {
  const [n, a, r] = te(e, t);
  return n + a.map(se(t == null ? void 0 : t.locale)).join((t == null ? void 0 : t.delimiter) ?? "_") + r;
}
function Pn(e, t) {
  return ce(e, { delimiter: ".", ...t });
}
function yn(e, t) {
  return ce(e, { delimiter: "-", ...t });
}
function Ln(e, t) {
  return ce(e, { delimiter: "/", ...t });
}
function gn(e, t) {
  const [n, a, r] = te(e, t), c = ie(t == null ? void 0 : t.locale), i = se(t == null ? void 0 : t.locale), s = le(c, i);
  return n + a.map((o, b) => b === 0 ? s(o) : c(o)).join((t == null ? void 0 : t.delimiter) ?? " ") + r;
}
function pn(e, t) {
  return ce(e, { delimiter: "_", ...t });
}
function Dn(e, t) {
  return he(e, { delimiter: "-", ...t });
}
function ie(e) {
  return e === !1 ? (t) => t.toLowerCase() : (t) => t.toLocaleLowerCase(e);
}
function se(e) {
  return e === !1 ? (t) => t.toUpperCase() : (t) => t.toLocaleUpperCase(e);
}
function le(e, t) {
  return (n) => `${t(n[0])}${e(n.slice(1))}`;
}
function Ce(e, t) {
  return (n, a) => {
    const r = n[0];
    return (a > 0 && r >= "0" && r <= "9" ? "_" + r : t(r)) + e(n.slice(1));
  };
}
function te(e, t = {}) {
  const n = t.split ?? (t.separateNumbers ? Rn : Ge), a = t.prefixCharacters ?? me, r = t.suffixCharacters ?? me;
  let c = 0, i = e.length;
  for (; c < e.length; ) {
    const s = e.charAt(c);
    if (!a.includes(s)) break;
    c++;
  }
  for (; i > c; ) {
    const s = i - 1, o = e.charAt(s);
    if (!r.includes(o)) break;
    i = s;
  }
  return [e.slice(0, c), n(e.slice(c, i)), e.slice(i)];
}
function ia(e, t, n) {
  let a = "";
  return typeof e == "object" ? (a = e.lastName || "", t = e.firstName || "", n = e.middleName) : (a = e || "", t = t || ""), we("{:}, {:}{:}", a, t, n ? ` ${n}` : "");
}
const sa = {
  camelCase: mn,
  capitalCase: he,
  constantCase: On,
  dotCase: Pn,
  kebabCase: yn,
  noCase: ce,
  pascalCase: Nn,
  pascalSnakeCase: Mn,
  pathCase: Ln,
  sentenceCase: gn,
  snakeCase: pn,
  titleCase: _n,
  trainCase: Dn
};
Number.prototype.toFormat = function(e, ...t) {
  return we(e, this, ...t);
};
export {
  Xe as CcmStatusUnit,
  He as Code,
  je as CodeValue,
  ke as ConsentCodeText,
  ze as DateFormatUnit,
  Un as DateSortType,
  _e as HicareDate,
  Je as HttpMethodUnit,
  Ze as PageRefererUnit,
  Qe as PageRouteUnit,
  Ke as ServiceTypeUnit,
  qe as SignatureUnit,
  We as TimeUnit,
  wn as allPass,
  Kn as chunk,
  oe as cloneDeep,
  vn as code,
  Yn as codeValue,
  kn as debounce,
  Zn as delay,
  Xn as filter,
  Vn as find,
  ea as findIndex,
  ta as flatMap,
  na as flatten,
  we as format,
  ia as getPersonFullName,
  aa as groupBy,
  Qn as inRange,
  X as isArray,
  xn as isBoolean,
  K as isEmpty,
  Gn as isError,
  ee as isFunction,
  jn as isIncludedIn,
  Cn as isNullish,
  Bn as isNumber,
  Ve as isNumeric,
  Hn as isObjectType,
  Fn as isString,
  ra as listToTree,
  Jn as map,
  zn as once,
  ca as orderBy,
  cn as parseCustomText,
  qn as reduce,
  Zn as sleep,
  tn as slice,
  sa as stringCase,
  Wn as throttle
};

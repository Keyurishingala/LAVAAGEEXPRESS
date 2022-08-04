import constant from '../component/constant';

export const mobileValidator = mobileNo => {
  const re = /^[0]?[6789]\d{9}$/;

  if (!mobileNo || mobileNo.length <= 0) {
    return constant.errorMobileNo;
  }
  if (!re.test(mobileNo)) {
    return constant.errorMobileNo;
  }

  return '';
};

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return constant.errorEmail;
  if (!re.test(email)) return constant.errorEmail;

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return constant.errorPassword;

  return '';
};
export const confirmPasswordValidator = (password, confirmPassword) => {
  if (!password || password.length <= 0) {
    return constant.errorPassword;
  } else if (password !== confirmPassword) {
    return constant.errorConfirmPassword;
  }

  return '';
};
export const reTypePassValidator = (password, reTypePass) => {
  if (!password || password.length <= 0) {
    return constant.errorPassword;
  } else if (password !== reTypePass) {
    return constant.errorreTypePass;
  }

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return constant.errorName;

  return '';
};
export const businessNameValidator = name => {
  if (!name || name.length <= 0) return constant.errorBusinessName;

  return '';
};

export const emptyValidator = name => {
  if (!name || name.length <= 0) {
    return constant.errUserName;
  }

  return '';
};

// export const dateValidator = (date) => {
//   if (!date || date.length <= 0) return Constant.errorDate;

//   const curDate = moment(Date.now()).format("YYYY/MM/DD");
//   const dt = moment(date).isSameOrAfter(curDate);
//   // console.log("date validation:", dt, ", curDate: ", curDate, ", selDate: ", date);
//   if (dt) return Constant.errorDate;

//   return "";
// };

// export const genderValidator = (gender) => {
//   if (gender === undefined) return Common.getTranslation(LangKey.errorGender);

//   return '';
// };
// export const weightValidator = (weight) => {
//   if (weight === '') return Common.getTranslation(LangKey.errorWeight);

//   return '';
// };
// export const heightValidator = (height) => {
//   let splitHeight = height.split('.');

//   if (splitHeight[0] === undefined && splitHeight[1] === undefined)
//     return Common.getTranslation(LangKey.errorHeight);

//   return '';
// };

// // profiles validators

// export const nameValidatorPro = (name, type) => {
//   if (
//     !name ||
//     name.length <= 0 ||
//     (type === Constant.titBusinessProfile ? name.length > 35 : name.length > 25)
//   ) {
//     return type === Constant.titPersonalProfile
//       ? Common.getTranslation(LangKey.personalUserNameErr)
//       : Common.getTranslation(LangKey.bussinessUserNameErr);
//   }
//   return '';
// };

// export const mobileValidatorPro = (mobileNo, type) => {
//   const re = /^[0]?[6789]\d{9}$/;

//   if (
//     !mobileNo ||
//     !re.test(mobileNo) ||
//     mobileNo.length <= 0 ||
//     mobileNo.length > 10
//   )
//     return type === Constant.titPersonalProfile
//       ? Common.getTranslation(LangKey.personalMobileErr)
//       : Common.getTranslation(LangKey.bussinessMobileErr);

//   return '';
// };

// export const emailValidatorPro = (email, type) => {
//   const re = /\S+@\S+\.\S+/;

//   if (!email || !re.test(email) || email.length <= 0 || email.length > 26)
//     return type === Constant.titPersonalProfile
//       ? Common.getTranslation(LangKey.personalEmailErr)
//       : Common.getTranslation(LangKey.bussinessEmailErr);

//   return '';
// };

// export const designationValidatorPro = (designation, type) => {
//   if (!designation || designation.length <= 0 || designation.length > 18)
//     return Common.getTranslation(LangKey.personalDesignationErr);

//   return '';
// };
// export const SocailMediaValidatorPro = (socialMediaId, type) => {
//   if (!socialMediaId || socialMediaId.length <= 0 || socialMediaId.length > 20)
//     return type === Constant.titPersonalProfile
//       ? Common.getTranslation(LangKey.personalSocialMediaIdErr)
//       : Common.getTranslation(LangKey.bussinessSocialMediaIdErr);

//   return '';
// };
// export const websiteValidatorPro = (website, type) => {
//   if (!website || website.length <= 0 || website.length > 26)
//     return type === Constant.titPersonalProfile
//       ? Common.getTranslation(LangKey.personalWebsiteErr)
//       : Common.getTranslation(LangKey.bussinessWebsiteErr);

//   return '';
// };
// export const AddressValidatorPro = (address) => {
//   if (!address || address.length <= 0 || address.length > 41)
//     return Common.getTranslation(LangKey.bussinessAddressErr);

//   return '';
// };

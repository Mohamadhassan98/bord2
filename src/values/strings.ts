import moment from "moment-jalaali";

moment.loadPersian({dialect: "persian-modern"});
moment.locale("fa");
export const getFullDate = (gregorian: Date) => moment(gregorian).format("YYYY/MM/DD");
export const appName = "بردو";

export const pages = {
    home: {
        playIt: "بازی کن!",
    },
    login: {
        signIn: "ورود",
        emailAddress: "آدرس ایمیل",
        password: "رمز عبور",
        keepMeSignedIn: "مرا داخل نگه دار",
        forgotPassword: "رمز عبور را فراموش کرده اید؟",
        signUpInstead: "حساب کاربری ندارید؟ ثبت نام کنید.",
        username: "نام کاربری",
        authError: "نام کاربری و/یا رمز عبور اشتباه است.",
        ok: "باشه",
    },
    signUp: {
        username: "نام کاربری",
        signUp: "ثبت نام",
        firstName: "نام",
        lastName: "نام خانوادگی",
        emailAddress: "آدرس ایمیل",
        password: "رمز عبور",
        passwordConfirm: "تکرار رمز عبور",
        avatar: "آواتار",
        loginInstead: "قبلاً ثبت نام کرده اید؟ وارد شوید.",
        emailError: "قالب ایمیل صحیح نیست.",
        passwordError: "رمز عبور باید حداقل 8 رقم شامل یک حرف و یک عدد باشد.",
        passwordConfirmError: "تکرار رمز عبور صحیح نیست.",
        usernameError: "نام کاربری از قبل وجود دارد.",
    },
    error404: {
        pageNotHere: "صفحه مورد نظر شما وجود ندارد.",
    },
    forgotPassword: {
        forgotPassword: "فراموشی رمز عبور",
        recover: "بازیابی",
        emailAddress: "آدرس ایمیل",
        emailSent: "ایمیل بازیابی به آدرس شما ارسال شد. لطفاً صندوق ورودی ایمیل خود را بررسی کنید.",
        ok: "باشه",
        emailError: "قالب ایمیل صحیح نیست.",
    },
    recoverPassword: {
        newPassword: "رمز عبور جدید",
        newPasswordConfirm: "تکرار رمز عبور",
        changePassword: "تغییر رمز عبور",
        passwordChanged: "رمز عبور با موفقیت تغییر کرد.",
        ok: "باشه",
        passwordError: "رمز عبور باید حداقل 8 رقم شامل یک حرف و یک عدد باشد.",
        passwordConfirmError: "تکرار رمز عبور صحیح نیست.",
    },
    profilePage: {
        editInfo: "ویرایش اطلاعات",
        latestPlayedGame: "بازی های اخیر",
    },
    editProfile: {
        editProfile: "ویرایش پروفایل",
        emailAddress: "آدرس ایمیل",
        oldPassword: "رمز عبور قبلی",
        newPassword: "رمز عبور جدید",
        newPasswordConfirm: "تکرار رمز عبور",
        changePassword: "تغییر رمز عبور",
        passwordChanged: "رمز عبور با موفقیت تغییر کرد.",
        ok: "باشه",
        passwordError: "رمز عبور باید حداقل 8 رقم شامل یک حرف و یک عدد باشد.",
        passwordConfirmError: "تکرار رمز عبور صحیح نیست.",
        emailError: "قالب ایمیل صحیح نیست.",
        avatar: "آواتار",
        profileEdited: "اطلاعات با موفقیت ثبت شد.",
    },
    gamePage: {
        downloadRulebook: "مطالعه قوانین",
        minimumPlayers: "حداقل بازیکن",
        maximumPlayers: "حداکثر بازیکن",
    },
};

export const components = {
    gameHistoryCard: {
        winner: "برنده",
        loser: "بازنده",
    },
    header: {
        mainPage: "صفحه اصلی",
        contactUs: "ارتباط با ما",
        aboutUs: "درباره ما",
        signInUp: "ورود / ثبت نام",
        signUp: "ثبت نام",
        login: "ورود",
        exit: "خروج",
        profile: "حساب کاربری",
    },
    searchBar: {
        placeHolder: "بازی مورد نظر خود را جستجو کنید.",
    },
};

export const validateUserSchema={
    username:{
        isLength:{
            options:{
min:3,
max:32,
        },
        errorMessage: "Username lenth must be min 3 and max 32",
    },
    isString:{
       errorMessage: "Username must be a string",
    },
    notEmpty:{
      errorMessage:  "Username must nto be empty",
    },
    },
    displayName:{
        notEmpty: true,
    },
};
export const validateRegisterInputs = (username: string, password: string) => {
   var errors: any = {};
   if (username.trim() === '') {
      errors.username = 'username must not be empty';
   }
   if (password === '') {
      errors.password = 'password must not be empty';
   }
   return {
      errors: errors,
      valid: Object.keys(errors).length === 0
   };
};

// for now, login input validation is the same as register validation
export const validateLoginInput = validateRegisterInputs;

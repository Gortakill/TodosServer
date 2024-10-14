import userController from '@/controllers/user.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { tryCatch } from '@/middlewares/tryCatch.middleware';
import { validator } from '@/middlewares/validator.middleware';
import { UserChangePasswordSchema } from '@/validationSchema/userChangePassword.validation';
import { UserLoginSchema } from '@/validationSchema/userLogin.validation';
import { UserRegisterSchema } from '@/validationSchema/userRegister.validation';
import { Router } from 'express';

const userRouter: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post(
	'/register',
	validator(UserRegisterSchema),
	tryCatch(userController.registration.bind(userController)),
);
userRouter.post(
	'/login',
	validator(UserLoginSchema),
	tryCatch(userController.login.bind(userController)),
);
userRouter.get(
	'/confirm/:link',
	tryCatch(userController.confirm.bind(userController)),
);

userRouter.get(
	'/getUser',
	AuthMiddleware,
	tryCatch(userController.getUser.bind(userController)),
);
userRouter.patch(
	'/changePassword',
	AuthMiddleware,
	validator(UserChangePasswordSchema),
	tryCatch(userController.updatePassword.bind(userController)),
);
userRouter.post(
	'/forgot',
	tryCatch(userController.forgotPassword.bind(userController)),
);
userRouter.patch(
	'/forgot/:link',
	validator(UserChangePasswordSchema),
	tryCatch(userController.changeForgotPassword.bind(userController)),
);

export default userRouter;

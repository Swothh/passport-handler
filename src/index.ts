import { Request, Response, NextFunction } from 'express';

interface Handlers {
    success?: (req: Request, res: Response, next: NextFunction) => any;
    error?: (error: { code: string, message: string }, req: Request, res: Response, next: NextFunction) => any;
}

export default function Handler(authenticate: (req: Request, res: Response, next: NextFunction) => any, handlers: Handlers) {
    return (req: Request, res: Response, next: NextFunction) => {
        const handleError = (isError?: any) => {
            if (isError) {
                if (handlers.error) {
                    return handlers.error(isError, req, res, next);
                } else {
                    return res.json({
                        success: false,
                        message: String(typeof isError == 'object' ? isError.message : isError).split('"').join("'"),
                        tip: 'You can customize this error by adding an error handler.'
                    });
                };
            } else {
                if (handlers.success) {
                    return handlers.success(req, res, next);
                } else {
                    return next();
                };
            };
        };

        return authenticate(req, res, handleError);
    };
};
import express, { Request, Response } from 'express';


const router = express.Router();

router.delete('/get/orders/:orderId', async (req: Request, res: Response) => {
    res.send({});
});

export { router as deleteOrderRouter }
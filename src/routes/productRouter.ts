import { Request, Response, Router } from 'express';
import ProductModel from '../models/Product';

const router = Router();

// ... kode lainnya ...

router.get('/owner/:ownerId', async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.ownerId;
    const page = parseInt(req.query.page as string) || 1; // Halaman saat ini
    const limit = parseInt(req.query.limit as string) || 10; // Jumlah produk per halaman

    const skip = (page - 1) * limit;

    const products = await ProductModel.find({ owner: ownerId })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil produk berdasarkan pemilik.', error });
  }
});

export default router;

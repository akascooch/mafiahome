import type { NextApiRequest, NextApiResponse } from 'next';
import { requestOtp, verifyOtp } from '../../../lib/api/otp';

type Data =
  | { status: 'otp-sent'; expiresAt: number }
  | { status: 'verified' }
  | { status: 'error'; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { phone } = req.body as { phone?: string };
      if (!phone) {
        throw new Error('شماره تلفن الزامی است');
      }
      const record = await requestOtp(phone);
      res.status(200).json({ status: 'otp-sent', expiresAt: record.expiresAt });
      return;
    } catch (error) {
      res.status(400).json({ status: 'error', message: (error as Error).message });
      return;
    }
  }

  if (method === 'PUT') {
    try {
      const { phone, code } = req.body as { phone?: string; code?: string };
      if (!phone || !code) {
        throw new Error('شماره تلفن و کد تایید الزامی است');
      }
      const ok = await verifyOtp(phone, code);
      if (!ok) {
        res.status(400).json({ status: 'error', message: 'کد تایید نامعتبر است' });
        return;
      }
      res.status(200).json({ status: 'verified' });
      return;
    } catch (error) {
      res.status(400).json({ status: 'error', message: (error as Error).message });
      return;
    }
  }

  res.setHeader('Allow', ['POST', 'PUT']);
  res.status(405).json({ status: 'error', message: 'روش نامعتبر' });
}

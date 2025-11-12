import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('در حال ثبت‌نام ...');
    setTimeout(() => setStatus('ثبت‌نام با موفقیت انجام شد!'), 500);
  };

  return (
    <>
      <Head>
        <title>ثبت‌نام | Mafia Home</title>
      </Head>
      <div className="min-h-screen bg-neutral-900 text-yellow-400 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-neutral-950 border border-yellow-700/40 rounded-2xl shadow-2xl shadow-yellow-900/30 p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">ایجاد حساب کاربری</h1>
            <p className="text-sm text-yellow-300/80">به جمع مافیابازهای حرفه‌ای خوش آمدید.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">نام نمایشی</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg bg-neutral-900 border border-yellow-700/40 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="مثال: دان مافیا"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">شماره تلفن</label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-lg bg-neutral-900 border border-yellow-700/40 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="مثال: 09120000000"
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-1">کد تایید</label>
              <input
                id="otp"
                type="text"
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="w-full rounded-lg bg-neutral-900 border border-yellow-700/40 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="کد ارسال شده"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-500 text-neutral-900 font-semibold py-2 transition-transform duration-300 hover:scale-[1.02] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              ثبت‌نام
            </button>
          </form>
          {status && (
            <p className="text-center text-sm text-yellow-300" role="status">{status}</p>
          )}
          <p className="text-center text-sm text-yellow-300/70">
            قبلا ثبت‌نام کرده‌اید؟{' '}
            <Link href="/auth/login" className="font-semibold text-yellow-400 hover:text-yellow-200">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

import { NextResponse } from 'next/server';

// خريطة ربط الخدمات الداخلية بأرقام خدمات المورد الأصلي
const SERVICE_MAPPING: Record<string, string> = {
  'ig-followers': '101', // استبدل 101 برقم الخدمة لدى المورد
  'tiktok-views': '102',
  'youtube-subs': '103',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageId, targetLink, quantity } = body;

    const providerServiceId = SERVICE_MAPPING[packageId] || packageId;
    const providerUrl = process.env.SMM_PROVIDER_URL || 'https://example-smm.com/api/v2';
    const apiKey = process.env.SMM_API_KEY || '';

    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('action', 'add');
    formData.append('service', providerServiceId);
    formData.append('link', targetLink);
    formData.append('quantity', String(quantity));

    const response = await fetch(providerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      orderId: data.order || 'TEMP_' + Date.now(),
      status: 'Processing',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Order processing failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset =
      process.env.CLOUDINARY_UPLOAD_PRESET ||
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Cloudinary Cloud Name is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or CLOUDINARY_CLOUD_NAME in .env.local',
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: 'No image file provided in request.' },
        { status: 400 }
      );
    }

    // Prepare payload for Cloudinary REST API
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);

    const timestamp = Math.round(Date.now() / 1000);

    // If API Key & Secret are provided, create a signed upload
    if (apiKey && apiSecret) {
      cloudinaryFormData.append('api_key', apiKey);
      cloudinaryFormData.append('timestamp', timestamp.toString());

      // Cloudinary signature generation: alphabetically sort parameters and hash with sha1
      const stringToSign = `timestamp=${timestamp}${apiSecret}`;
      const signature = crypto
        .createHash('sha1')
        .update(stringToSign)
        .digest('hex');

      cloudinaryFormData.append('signature', signature);
    } else if (uploadPreset) {
      // Use unsigned upload preset
      cloudinaryFormData.append('upload_preset', uploadPreset);
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            'Cloudinary credentials incomplete. Please set either NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET or CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET in .env.local',
        },
        { status: 500 }
      );
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Cloudinary API upload error:', data.error);
      return NextResponse.json(
        {
          success: false,
          message:
            data.error?.message ||
            'Failed to upload image to Cloudinary. Check your Cloudinary configuration.',
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      secure_url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
    });
  } catch (error: unknown) {
    console.error('Upload route error:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          (error as Error).message || 'Internal server error during image upload.',
      },
      { status: 500 }
    );
  }
}

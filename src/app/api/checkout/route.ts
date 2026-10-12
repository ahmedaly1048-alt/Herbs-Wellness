import { NextResponse } from 'next/server';

type CheckoutItem = {
  quantity: number;
  selectedVariant?: string;
  product: {
    price?: number;
    variants?: { id: string; price: number }[];
  };
};

export async function POST(req: Request) {
  try {
    const body: { items?: CheckoutItem[] } = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate Total Server Side to prevent tampering
    const totalAmount = items.reduce((acc, item) => {
      const variant = item.product.variants?.find(
        (productVariant) => productVariant.id === item.selectedVariant
      );
      const itemPrice = variant?.price ?? item.product.price ?? item.product.variants?.[0]?.price ?? 0;
      return acc + itemPrice * item.quantity;
    }, 0);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Place DB operations / Paystack / Flutterwave / Stripe API integration here

    return NextResponse.json(
      {
        success: true,
        orderId,
        totalAmount,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
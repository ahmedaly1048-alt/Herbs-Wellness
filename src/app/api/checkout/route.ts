import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate Total Server Side to prevent tampering
    const totalAmount = items.reduce((acc: number, item: any) => {
      const itemPrice = item.product.isVariable && item.product.variants?.length
        ? item.product.variants[0].price
        : item.product.price || 0;
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
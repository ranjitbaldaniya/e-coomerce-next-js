import { connect } from "@/utils/config/dbConfig";
import Product from "@/utils/models/product";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();


        console.log("payload ===>", payload)
        const products = await Product.insertMany(payload);

        // const newProduct = new Product(payload);

        // const savedProduct = await newProduct.save();

        return NextResponse.json({
            message: "Product created successfully",
            success: true,
            products,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
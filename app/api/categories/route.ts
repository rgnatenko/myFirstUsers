import Categorie from "@/app/types/Categorie";
import { NextResponse } from "next/server";

const categories: Categorie[] = [
    {
        title: "ACQUISITION",
        items: ["Content", "SEO", "Sales", "Social", "Ads"],
    },
    { title: "CONVERSION", items: ["Copywriting", "Landing Page"] },
    { title: "MORE", items: ["Retention", "Brand", "Referral", "Creative"] },
    { title: "NEWSLETTER", items: [] },
];

export function GET() {
    return NextResponse.json(categories);
}

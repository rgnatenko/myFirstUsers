import Example from '@/app/types/Example';
import { NextRequest, NextResponse } from 'next/server';
import { examples } from './data';

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("category");

    if (query) {
        const filteredExamples = examples.filter(example => example.tag === query);
        return NextResponse.json(filteredExamples);
    }

    return NextResponse.json(examples);
}

export async function POST(request: NextRequest) {
    try {
        const newExample: Example = await request.json();

        if (!newExample.title || !newExample.duration || !newExample.tag) {
            return NextResponse.json({ error: 'Invalid example format' }, { status: 400 });
        }

        examples.push(newExample);

        return NextResponse.json(examples);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add example' }, { status: 500 });
    }
}

import { useSearchParams } from "next/navigation";

export default function useQueryParam(paramName: string) {
    const searchParams = useSearchParams();
    const query = searchParams.get(paramName);

    return query;
}

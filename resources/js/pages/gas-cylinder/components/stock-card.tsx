import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, ThousandSeparatorID } from '@/lib/utils';
import { StockCardColors } from '../lib';
import { StockCardProps } from '../types';

export function StockCard({ label, stock, desc, variant = 'default' }: StockCardProps) {
    return (
        <Card className={StockCardColors[variant].card}>
            <CardHeader className="pb-3">
                <CardDescription className={cn('text-base', StockCardColors[variant].cardDesc)}>{label}</CardDescription>
                <CardTitle className={cn('text-4xl', StockCardColors[variant].cardTitle)}>{ThousandSeparatorID(stock)}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={cn('text-sm', StockCardColors[variant].contentText)}>{desc}</div>
            </CardContent>
        </Card>
    );
}

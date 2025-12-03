export declare class CreateEventDto {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    venue: string;
    status?: string;
    poojas?: Array<{
        name: string;
        durationMinutes: number;
        significance?: string;
        price?: number;
    }>;
}
//# sourceMappingURL=create-event.dto.d.ts.map
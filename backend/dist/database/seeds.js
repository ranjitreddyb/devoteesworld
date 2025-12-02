"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SeedService = class SeedService {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async seed() {
        try {
            // Check if events already exist
            const count = await this.eventModel.countDocuments();
            if (count > 0) {
                console.log('✅ Events already seeded');
                return;
            }
            const events = [
                {
                    title: 'Sunday Surya Puja',
                    description: 'Weekly Sun worship ceremony for health and prosperity',
                    startDate: new Date('2025-12-07T09:00:00'),
                    endDate: new Date('2025-12-07T11:00:00'),
                    venue: 'Main Temple',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Surya Puja',
                            durationMinutes: 120,
                            significance: 'Worship of the Sun God for vitality and success',
                            price: 500,
                        },
                    ],
                },
                {
                    title: 'Hanuman Chalisa Recitation',
                    description: 'Monthly devotional recitation and meditation',
                    startDate: new Date('2025-12-08T18:00:00'),
                    endDate: new Date('2025-12-08T19:30:00'),
                    venue: 'Prayer Hall',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Hanuman Chalisa',
                            durationMinutes: 90,
                            significance: 'Chant for courage and strength',
                            price: 300,
                        },
                    ],
                },
                {
                    title: 'Lakshmi Puja',
                    description: 'Special puja for wealth and abundance',
                    startDate: new Date('2025-12-14T10:00:00'),
                    endDate: new Date('2025-12-14T12:00:00'),
                    venue: 'Main Temple',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Lakshmi Puja',
                            durationMinutes: 120,
                            significance: 'Worship of Goddess Lakshmi for prosperity',
                            price: 700,
                        },
                    ],
                },
                {
                    title: 'Bhagavad Gita Study Circle',
                    description: 'Weekly spiritual discussion and study',
                    startDate: new Date('2025-12-15T19:00:00'),
                    endDate: new Date('2025-12-15T20:30:00'),
                    venue: 'Study Room',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Gita Discourse',
                            durationMinutes: 90,
                            significance: 'Understanding Hindu philosophy',
                            price: 200,
                        },
                    ],
                },
                {
                    title: 'Durga Puja Festival',
                    description: 'Grand celebration with rituals and festivities',
                    startDate: new Date('2025-12-21T08:00:00'),
                    endDate: new Date('2025-12-21T18:00:00'),
                    venue: 'Main Temple Grounds',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Durga Puja',
                            durationMinutes: 240,
                            significance: 'Worship of Goddess Durga for victory over evil',
                            price: 1000,
                        },
                        {
                            name: 'Aarti',
                            durationMinutes: 60,
                            significance: 'Evening prayer ceremony',
                            price: 300,
                        },
                    ],
                },
                {
                    title: 'Shiva Abhisheka',
                    description: 'Sacred bathing ceremony of Lord Shiva',
                    startDate: new Date('2025-12-22T06:00:00'),
                    endDate: new Date('2025-12-22T08:00:00'),
                    venue: 'Main Temple',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Shiva Abhisheka',
                            durationMinutes: 120,
                            significance: 'Ritual bathing for spiritual purification',
                            price: 600,
                        },
                    ],
                },
                {
                    title: 'Vishnu Sahasranama Recitation',
                    description: '1000 names of Lord Vishnu chanting ceremony',
                    startDate: new Date('2025-12-28T15:00:00'),
                    endDate: new Date('2025-12-28T17:00:00'),
                    venue: 'Prayer Hall',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Vishnu Sahasranama',
                            durationMinutes: 120,
                            significance: 'Recitation of 1000 divine names',
                            price: 400,
                        },
                    ],
                },
                {
                    title: 'New Year Special Puja',
                    description: 'Welcome new year with divine blessings',
                    startDate: new Date('2026-01-01T09:00:00'),
                    endDate: new Date('2026-01-01T11:00:00'),
                    venue: 'Main Temple',
                    status: 'future',
                    poojas: [
                        {
                            name: 'New Year Puja',
                            durationMinutes: 120,
                            significance: 'Seek blessings for prosperity in new year',
                            price: 800,
                        },
                    ],
                },
                {
                    title: 'Gayatri Mantra Chanting',
                    description: 'Daily mantra recitation session',
                    startDate: new Date('2025-12-30T06:30:00'),
                    endDate: new Date('2025-12-30T07:30:00'),
                    venue: 'Meditation Hall',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Gayatri Mantra',
                            durationMinutes: 60,
                            significance: 'Most sacred mantra for spiritual awakening',
                            price: 250,
                        },
                    ],
                },
                {
                    title: 'Krishna Leela Enactment',
                    description: 'Dramatic performance of Lord Krishna stories',
                    startDate: new Date('2026-01-10T18:00:00'),
                    endDate: new Date('2026-01-10T20:30:00'),
                    venue: 'Main Temple Grounds',
                    status: 'future',
                    poojas: [
                        {
                            name: 'Krishna Leela',
                            durationMinutes: 150,
                            significance: 'Stories of Lord Krishna',
                            price: 350,
                        },
                    ],
                },
            ];
            await this.eventModel.insertMany(events);
            console.log('✅ Seeded 10 events successfully');
        }
        catch (error) {
            console.error('❌ Seed error:', error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Event')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeedService);
//# sourceMappingURL=seeds.js.map
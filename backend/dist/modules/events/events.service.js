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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EventsService = class EventsService {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async findAll(filters) {
        try {
            let query = this.eventModel.find();
            if (filters?.status) {
                query = query.where('status').equals(filters.status);
            }
            if (filters?.venue) {
                query = query.where('venue').regex(new RegExp(filters.venue, 'i'));
            }
            // Don't try to populate priests - just return events directly
            const events = await query.exec();
            return events;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error fetching events');
        }
    }
    async findById(id) {
        try {
            const event = await this.eventModel.findById(id).exec();
            if (!event) {
                throw new common_1.NotFoundException('Event not found');
            }
            return event;
        }
        catch (error) {
            throw new common_1.NotFoundException('Event not found');
        }
    }
    async create(createEventDto) {
        try {
            const event = await this.eventModel.create(createEventDto);
            return event;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating event');
        }
    }
    async update(id, updateEventDto) {
        try {
            const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
            if (!event) {
                throw new common_1.NotFoundException('Event not found');
            }
            return event;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating event');
        }
    }
    async delete(id) {
        try {
            const event = await this.eventModel.findByIdAndDelete(id);
            if (!event) {
                throw new common_1.NotFoundException('Event not found');
            }
            return { message: 'Event deleted successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error deleting event');
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Event')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventsService);
//# sourceMappingURL=events.service.js.map
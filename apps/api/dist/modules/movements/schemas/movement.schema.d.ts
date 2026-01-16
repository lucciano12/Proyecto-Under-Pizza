import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { MovementType } from '@rotulos/shared';
export type MovementDocument = HydratedDocument<Movement>;
export declare class Movement {
    clientRequestId: string;
    productId: MongooseSchema.Types.ObjectId;
    type: MovementType;
    quantity: number;
    notes: string;
    performedBy: string;
}
export declare const MovementSchema: MongooseSchema<Movement, import("mongoose").Model<Movement, any, any, any, (import("mongoose").Document<unknown, any, Movement, any, import("mongoose").DefaultSchemaOptions> & Movement & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Movement, any, import("mongoose").DefaultSchemaOptions> & Movement & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Movement>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Movement, import("mongoose").Document<unknown, {}, Movement, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    clientRequestId?: import("mongoose").SchemaDefinitionProperty<string, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    productId?: import("mongoose").SchemaDefinitionProperty<MongooseSchema.Types.ObjectId, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<MovementType, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    performedBy?: import("mongoose").SchemaDefinitionProperty<string, Movement, import("mongoose").Document<unknown, {}, Movement, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movement & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Movement>;

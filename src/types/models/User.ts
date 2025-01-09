// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UserProps = Omit<User, NonNullable<FunctionPropertyNames<User>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUserProps = Omit<UserProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class User implements CompatEntity {

    constructor(
        
        id: string,
        active: boolean,
        addedAt: Date,
        addedBy: string,
    ) {
        this.id = id;
        this.active = active;
        this.addedAt = addedAt;
        this.addedBy = addedBy;
        
    }

    public id: string;
    public active: boolean;
    public addedAt: Date;
    public removedAt?: Date;
    public addedBy: string;
    

    get _name(): string {
        return 'User';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save User entity without an ID");
        await store.set('User', id.toString(), this as unknown as CompatUserProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove User entity without an ID");
        await store.remove('User', id.toString());
    }

    static async get(id: string): Promise<User | undefined> {
        assert((id !== null && id !== undefined), "Cannot get User entity without an ID");
        const record = await store.get('User', id.toString());
        if (record) {
            return this.create(record as unknown as UserProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UserProps>[], options: GetOptions<CompatUserProps>): Promise<User[]> {
        const records = await store.getByFields<CompatUserProps>('User', filter, options);
        return records.map(record => this.create(record as unknown as UserProps));
    }

    static create(record: UserProps): User {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.active,
            record.addedAt,
            record.addedBy,
        );
        Object.assign(entity,record);
        return entity;
    }
}

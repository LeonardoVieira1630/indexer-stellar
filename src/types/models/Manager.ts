// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ManagerProps = Omit<Manager, NonNullable<FunctionPropertyNames<Manager>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatManagerProps = Omit<ManagerProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Manager implements CompatEntity {

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
        return 'Manager';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Manager entity without an ID");
        await store.set('Manager', id.toString(), this as unknown as CompatManagerProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Manager entity without an ID");
        await store.remove('Manager', id.toString());
    }

    static async get(id: string): Promise<Manager | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Manager entity without an ID");
        const record = await store.get('Manager', id.toString());
        if (record) {
            return this.create(record as unknown as ManagerProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ManagerProps>[], options: GetOptions<CompatManagerProps>): Promise<Manager[]> {
        const records = await store.getByFields<CompatManagerProps>('Manager', filter, options);
        return records.map(record => this.create(record as unknown as ManagerProps));
    }

    static create(record: ManagerProps): Manager {
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

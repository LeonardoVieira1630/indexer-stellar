// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type TransferProps = Omit<Transfer, NonNullable<FunctionPropertyNames<Transfer>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatTransferProps = Omit<TransferProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Transfer implements CompatEntity {

    constructor(
        
        id: string,
        ledger: number,
        date: Date,
        contract: string,
        fromId: string,
        toId: string,
        value: bigint,
    ) {
        this.id = id;
        this.ledger = ledger;
        this.date = date;
        this.contract = contract;
        this.fromId = fromId;
        this.toId = toId;
        this.value = value;
        
    }

    public id: string;
    public ledger: number;
    public date: Date;
    public contract: string;
    public fromId: string;
    public toId: string;
    public value: bigint;
    

    get _name(): string {
        return 'Transfer';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Transfer entity without an ID");
        await store.set('Transfer', id.toString(), this as unknown as CompatTransferProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Transfer entity without an ID");
        await store.remove('Transfer', id.toString());
    }

    static async get(id: string): Promise<Transfer | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Transfer entity without an ID");
        const record = await store.get('Transfer', id.toString());
        if (record) {
            return this.create(record as unknown as TransferProps);
        } else {
            return;
        }
    }

    static async getByFromId(fromId: string, options: GetOptions<CompatTransferProps>): Promise<Transfer[]> {
        const records = await store.getByField<CompatTransferProps>('Transfer', 'fromId', fromId, options);
        return records.map(record => this.create(record as unknown as TransferProps));
    }
    

    static async getByToId(toId: string, options: GetOptions<CompatTransferProps>): Promise<Transfer[]> {
        const records = await store.getByField<CompatTransferProps>('Transfer', 'toId', toId, options);
        return records.map(record => this.create(record as unknown as TransferProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<TransferProps>[], options: GetOptions<CompatTransferProps>): Promise<Transfer[]> {
        const records = await store.getByFields<CompatTransferProps>('Transfer', filter, options);
        return records.map(record => this.create(record as unknown as TransferProps));
    }

    static create(record: TransferProps): Transfer {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ledger,
            record.date,
            record.contract,
            record.fromId,
            record.toId,
            record.value,
        );
        Object.assign(entity,record);
        return entity;
    }
}

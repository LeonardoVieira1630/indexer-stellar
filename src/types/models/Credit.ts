// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CreditProps = Omit<Credit, NonNullable<FunctionPropertyNames<Credit>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCreditProps = Omit<CreditProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Credit implements CompatEntity {

    constructor(
        
        id: string,
        accountId: string,
        amount: string,
    ) {
        this.id = id;
        this.accountId = accountId;
        this.amount = amount;
        
    }

    public id: string;
    public accountId: string;
    public amount: string;
    

    get _name(): string {
        return 'Credit';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Credit entity without an ID");
        await store.set('Credit', id.toString(), this as unknown as CompatCreditProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Credit entity without an ID");
        await store.remove('Credit', id.toString());
    }

    static async get(id: string): Promise<Credit | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Credit entity without an ID");
        const record = await store.get('Credit', id.toString());
        if (record) {
            return this.create(record as unknown as CreditProps);
        } else {
            return;
        }
    }

    static async getByAccountId(accountId: string, options: GetOptions<CompatCreditProps>): Promise<Credit[]> {
        const records = await store.getByField<CompatCreditProps>('Credit', 'accountId', accountId, options);
        return records.map(record => this.create(record as unknown as CreditProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CreditProps>[], options: GetOptions<CompatCreditProps>): Promise<Credit[]> {
        const records = await store.getByFields<CompatCreditProps>('Credit', filter, options);
        return records.map(record => this.create(record as unknown as CreditProps));
    }

    static create(record: CreditProps): Credit {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.accountId,
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}

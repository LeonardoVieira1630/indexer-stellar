// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DebitProps = Omit<Debit, NonNullable<FunctionPropertyNames<Debit>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDebitProps = Omit<DebitProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Debit implements CompatEntity {

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
        return 'Debit';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Debit entity without an ID");
        await store.set('Debit', id.toString(), this as unknown as CompatDebitProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Debit entity without an ID");
        await store.remove('Debit', id.toString());
    }

    static async get(id: string): Promise<Debit | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Debit entity without an ID");
        const record = await store.get('Debit', id.toString());
        if (record) {
            return this.create(record as unknown as DebitProps);
        } else {
            return;
        }
    }

    static async getByAccountId(accountId: string, options: GetOptions<CompatDebitProps>): Promise<Debit[]> {
        const records = await store.getByField<CompatDebitProps>('Debit', 'accountId', accountId, options);
        return records.map(record => this.create(record as unknown as DebitProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DebitProps>[], options: GetOptions<CompatDebitProps>): Promise<Debit[]> {
        const records = await store.getByFields<CompatDebitProps>('Debit', filter, options);
        return records.map(record => this.create(record as unknown as DebitProps));
    }

    static create(record: DebitProps): Debit {
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

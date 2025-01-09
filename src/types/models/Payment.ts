// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type PaymentProps = Omit<Payment, NonNullable<FunctionPropertyNames<Payment>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatPaymentProps = Omit<PaymentProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Payment implements CompatEntity {

    constructor(
        
        id: string,
        txHash: string,
        fromId: string,
        toId: string,
        amount: string,
    ) {
        this.id = id;
        this.txHash = txHash;
        this.fromId = fromId;
        this.toId = toId;
        this.amount = amount;
        
    }

    public id: string;
    public txHash: string;
    public fromId: string;
    public toId: string;
    public amount: string;
    

    get _name(): string {
        return 'Payment';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Payment entity without an ID");
        await store.set('Payment', id.toString(), this as unknown as CompatPaymentProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Payment entity without an ID");
        await store.remove('Payment', id.toString());
    }

    static async get(id: string): Promise<Payment | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Payment entity without an ID");
        const record = await store.get('Payment', id.toString());
        if (record) {
            return this.create(record as unknown as PaymentProps);
        } else {
            return;
        }
    }

    static async getByFromId(fromId: string, options: GetOptions<CompatPaymentProps>): Promise<Payment[]> {
        const records = await store.getByField<CompatPaymentProps>('Payment', 'fromId', fromId, options);
        return records.map(record => this.create(record as unknown as PaymentProps));
    }
    

    static async getByToId(toId: string, options: GetOptions<CompatPaymentProps>): Promise<Payment[]> {
        const records = await store.getByField<CompatPaymentProps>('Payment', 'toId', toId, options);
        return records.map(record => this.create(record as unknown as PaymentProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<PaymentProps>[], options: GetOptions<CompatPaymentProps>): Promise<Payment[]> {
        const records = await store.getByFields<CompatPaymentProps>('Payment', filter, options);
        return records.map(record => this.create(record as unknown as PaymentProps));
    }

    static create(record: PaymentProps): Payment {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.txHash,
            record.fromId,
            record.toId,
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}

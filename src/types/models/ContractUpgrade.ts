// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ContractUpgradeProps = Omit<ContractUpgrade, NonNullable<FunctionPropertyNames<ContractUpgrade>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatContractUpgradeProps = Omit<ContractUpgradeProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ContractUpgrade implements CompatEntity {

    constructor(
        
        id: string,
        timestamp: Date,
        newWasmHash: string,
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.newWasmHash = newWasmHash;
        
    }

    public id: string;
    public timestamp: Date;
    public newWasmHash: string;
    

    get _name(): string {
        return 'ContractUpgrade';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ContractUpgrade entity without an ID");
        await store.set('ContractUpgrade', id.toString(), this as unknown as CompatContractUpgradeProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ContractUpgrade entity without an ID");
        await store.remove('ContractUpgrade', id.toString());
    }

    static async get(id: string): Promise<ContractUpgrade | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ContractUpgrade entity without an ID");
        const record = await store.get('ContractUpgrade', id.toString());
        if (record) {
            return this.create(record as unknown as ContractUpgradeProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ContractUpgradeProps>[], options: GetOptions<CompatContractUpgradeProps>): Promise<ContractUpgrade[]> {
        const records = await store.getByFields<CompatContractUpgradeProps>('ContractUpgrade', filter, options);
        return records.map(record => this.create(record as unknown as ContractUpgradeProps));
    }

    static create(record: ContractUpgradeProps): ContractUpgrade {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.timestamp,
            record.newWasmHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}

import { DataTypes, Sequelize } from 'sequelize';

export function mapperColumns(columns, options = {}) {
    const { forMigration = false } = options;
    const mappedColumns = {};

    for (const key in columns) {
        const col = columns[key];

        let typeValue;
        if (typeof col.type === 'function') {
            typeValue = col.type();
        } else {
            const matchLength = col.type.match(/\d+/)?.[0];
            const baseType = col.type.split('(')[0];

            typeValue = matchLength
                ? DataTypes[baseType](parseInt(matchLength))
                : DataTypes[baseType];
        }

        mappedColumns[key] = {
            type: typeValue,
            allowNull: col.allowNull,
            primaryKey: col.primaryKey || false,
            autoIncrement: col.autoIncrement || false,
            defaultValue: !col.defaultValue
            ? undefined
            : col.defaultValue === 'CURRENT_TIMESTAMP'
                ? Sequelize.literal('CURRENT_TIMESTAMP')
                : col.defaultValue,
            unique: col.unique || false
        };
    }

    return mappedColumns;
}
import { DataTypes } from 'sequelize';

export const DataType = {
    INTEGER: DataTypes.INTEGER,
    STRING: (length) => DataTypes.STRING(length),
    DATE: DataTypes.DATE,
    BOOLEAN: DataTypes.BOOLEAN
};
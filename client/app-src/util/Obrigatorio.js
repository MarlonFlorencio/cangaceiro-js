import { ApplicationException } from './ApplicationException.js';

export function obrigatorio(parametro) {
    throw new ApplicationException(`${parametro} é um parâmetro obrigatório`);
}
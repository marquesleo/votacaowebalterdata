import { Recurso } from './Recurso';

export interface RecursoASerVotado extends Recurso {
    selecionado:boolean;
    observacao:string;
    idusuario:string;
 }
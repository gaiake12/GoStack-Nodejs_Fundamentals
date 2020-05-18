import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ExecuteCreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: ExecuteCreateTransaction): Transaction {
    try {
      const { total } = this.transactionsRepository.getBalance();
      if (type === 'outcome' && value > total) {
        throw Error('Can t add the new outcome');
      }
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    } catch (err) {
      throw Error('The string -type- must be -income- or -outcome-');
    }
  }
}

export default CreateTransactionService;

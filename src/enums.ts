enum Issue {
  LocalPayments = 'LocalPayments',
  Remittance = 'Remittance',
  BalanceTransfer = 'BalanceTransfer',
  MissingCard = 'MissingCard',
  General = 'General',
  Maintenance = 'Maintenance',
  Uncategorized = 'Uncategorized'
}

enum Status {
  Pending = 1,
  Done
}

export {
  Issue,
  Status
}
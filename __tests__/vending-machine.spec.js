const VendingMachine = require('../lib/vending-machine.js')

describe('VendingMachine', () => {
  let transaction
  beforeEach(() => {
    transaction = new VendingMachine('../lib/inventory.json')
  })

  describe('when checking for all existing inventory', () => {
    it('should return every product and how many are available', () => {
      expect(transaction.checkInventory()).toEqual(
        'the-office-complete-collection: 3, one-fluffy-cat: 5, big-jug-of-cold-coffee: 1, obnoxious-christmas-socks: 5, sparkly-nail-polish: 0'
      )
    })
  })

  describe('when checking for all product slots', () => {
    it('should return every product and the slot it is in', () => {
      expect(transaction.checkAllSlots()).toEqual(
        'the-office-complete-collection: F1, one-fluffy-cat: F2, big-jug-of-cold-coffee: G1, obnoxious-christmas-socks: G2, sparkly-nail-polish: H1'
      )
    })
  })

  describe('when checking for specific product slot', () => {
    it('should return the specific product and the slot it is in', () => {
      expect(transaction.checkOneSlot('F1')).toEqual('the-office-complete-collection')
    })
  })

  describe('when purchasing product with exact change', () => {
    it('should return product with no change', () => {
      expect(transaction.makePurchase('obnoxious-christmas-socks', 4.5)).toEqual({
        item: 'obnoxious-christmas-socks',
        change: 0,
      })
    })
  })

  describe('when purchasing product with too much money', () => {
    it('should return product and needed change', () => {
      expect(transaction.makePurchase('obnoxious-christmas-socks', 5)).toEqual({
        item: 'obnoxious-christmas-socks',
        change: 0.50,
      })
    })
  })

  describe('when purchasing product with not enough money', () => {
    it('should return error message', () => {
      expect(transaction.makePurchase('obnoxious-christmas-socks', 4)).toEqual('oops, it looks like you have insufficient funds!')
    })
  })

  describe('when product does not exist in inventory', () => {
    it('should return an error message', () => {
      expect(transaction.productAvailability('fruit-basket')).toEqual('sorry, item does not exist!')
    })
  })

  describe('when product exists in inventory', () => {
    it('should return available message', () => {
      expect(transaction.productAvailability('one-fluffy-cat')).toEqual('this item is still available for purchase')
    })
  })

  describe('when checking for all existing change', () => {
    it('should return max possible number of coins in machine', () => {
      expect(transaction.checkChange()).toEqual(415)
    })
  })

  describe.only('when looking to refill items in vending machine', () => {
    it('should return all out-of-stock items', () => {
      expect(transaction.stockItems()).toEqual('sparklyNailPolish')
    })
  })

  describe('when looking to refill items in vending machine', () => {
    it('should return all fully-stocked items', () => {
      expect(transaction.stockItems()).toEqual('oneFluffyCat')
    })
  })

})
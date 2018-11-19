class VendingMachine {
  constructor(json) {
    this.inventory = require(json)
  }

  checkInventory() {
    const itemInventory = Object.entries(this.inventory.items)
    return itemInventory
      .reduce((acc, item) => {
        acc.push(`${item[1].name}: ${item[1].quantity}`)
        return acc
      }, [])
      .join(', ')
  }

  checkAllSlots() {
    const itemSlot = Object.entries(this.inventory.items)
    return itemSlot
      .reduce((acc, item) => {
        acc.push(`${item[1].name}: ${item[1].slot}`)
        return acc
      }, [])
      .join(', ')
  }

  checkOneSlot(slotNumber) {
    const entries = Object.entries(this.inventory.items)
    let chosenItem = null
    entries.map(item => {
      if (item[1].slot === slotNumber) {
        return (chosenItem = `${item[1].name}`)
      } else {
        return chosenItem
      }
    })
    return chosenItem
  }

  makePurchase(product, credit) {
    let itemName = this.inventory.items[product].name
    let itemPrice = this.inventory.items[product].itemPrice
    let purchase = {
      item: '',
      change: ''
    }
    if (credit === itemPrice || credit > itemPrice) {
      purchase.item = itemName
      purchase.change = credit - itemPrice
      return purchase
    }
    if (credit < itemPrice) {
      return 'oops, it looks like you have insufficient funds!'
    }
  }

  productAvailability(product) {
    const availableItem = Object.entries(this.inventory.items)
    let available

    availableItem.filter(string => {
      if (string[1].name.includes(product)) {
        return (available = 'this item is still available for purchase')
      } else {
        return (available = 'sorry, item does not exist!')
      }
    })
    return available
  }

  checkChange() {
    const changeInventory = Object.entries(this.inventory.change)
    let totalAmount = 0
    changeInventory.map(change => {
      if (change[1].count < change[1].maxCount) {
        change[1].count = change[1].maxCount
      }
      totalAmount += change[1].maxCount
    })
    return totalAmount
  }

  stockItems() {
    let refillItem = Object.refillItem(this.inventory.items)
    const stocked = refillItem
      .map(filter => {
        if (filter.quantity === filter.maxStock) {
          return `${filter.name}`
        } else {
          return `${filter.name}`
        }
      })
      .join(', ')
    return stocked
  }
}






module.exports = VendingMachine;
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    if (this.count > this.capacity) {
      this.resize();
    }
    const newPair = new KeyValuePair(key, value);
    const hashedKey = this.hashMod(key);
    let existing = this.data[hashedKey];

    if (existing) {
      let updated = false;
      let currNode = existing;
      while (currNode) {
        if (newPair.key === currNode.key) {
          currNode.value = newPair.value;
          updated = true;
        }
        currNode = currNode.next;
      }
      
      if (!updated) {
        newPair.next = existing;
        this.data[hashedKey] = newPair;
        this.count++;
      }
    } else {
      this.data[hashedKey] = newPair;
      this.count++;
    }
  }


  read(key) {
    let bucket = this.data[this.hashMod(key)];
    if (bucket) {
      if (bucket.key === key) {
        return bucket.value;
      } else {
        if (bucket.next) {
          let currNode = bucket;
          while (currNode) {
            if (currNode.key === key) {
              return currNode.value;
            }
            currNode = currNode.next;
          }
        }
      }
    }
    return undefined;
  }


  resize() {
    this.capacity *= 2;
    let bigger = new HashTable(this.capacity);
    this.data.forEach((bucket) => {
      if (bucket) {
        if (!bucket.next) {
          bigger.insert(bucket.key, bucket.value);
        } else {
          let currNode = bucket;
          while (currNode) {
            bigger.insert(currNode.key, currNode.value);
            currNode = currNode.next;
          }
        }
      }
    });
    this.data = bigger.data;
  }


  delete(key) {
    let bucket = this.data[this.hashMod(key)];

    if (bucket) {
      if (!bucket.next) {
        if (bucket.key === key) {
          this.data[this.hashMod(key)] = null;
          this.count--;
        }
      } else if (bucket.key === key) {
        this.data[this.hashMod(key)] = bucket.next;
        this.count--;
      } else {
        let prev = bucket;
        let curr = bucket.next;
        while (curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            this.count--;
          }
          prev = curr;
          curr = curr.next;
        }
      }
    }
    return "Key not found";
  }
}


module.exports = HashTable;
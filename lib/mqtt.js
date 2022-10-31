import mqtt from 'mqtt'

const mqttClientLookup = {}
let id = 0
export function MqttClient(id, config) {
  if (mqttClientLookup[id]) {
    return mqttClientLookup[id]
  }
  mqttClientLookup[id] = new MqttClientClass(id, config)
  return mqttClientLookup[id]
}

export class MqttClientClass {
  constructor(id, config) {
    this.id = id
    this.topics = {}

    this.mqttClient = mqtt.connect(config.url, config.options)

    this.mqttClient.on('connect', () => {
      console.log('mqtt', this.id, 'connected')
    })

    this.mqttClient.on('message', (topic, payload) => {
      // console.log('mqtt', this.id, topic)
      if (!Object.keys(this.topics[topic] || {}).length) {
        console.log('mqtt', this.id, 'no subscribe for topic', topic)
        return
      }
      let json = payload
      try {
        json = JSON.parse(payload.toString('utf-8'))
      } catch (e) {
        console.log('mqtt', this.id, 'payload not a json')
      }

      for (let cb of Object.values(this.topics[topic])) {
        if (typeof cb === 'function') {
          cb(topic, json)
        }
      }
    })

    this.mqttClient.on('disconnect', () => {
      console.log('mqtt', this.id, 'disconnected')
    })

    this.mqttClient.on('reconnect', () => {
      console.log('mqtt', this.id, 'reconnecting')
    })
  }

  publish(topic, payload) {
    if (typeof payload === 'string' || payload instanceof Buffer) {
      this.mqttClient.publish(topic, payload)
    } else {
      this.mqttClient.publish(topic, JSON.stringify(payload))
    }
  }

  subscribe(topic, cb) {
    let subId = id
    id++
    if (!this.topics[topic]) {
      this.topics[topic] = {}
    }
    this.topics[topic][subId] = cb
    this.mqttClient.subscribe(topic)
    return subId
  }

  unsubscribe(topic, subId) {
    if (!this.topics[topic]) {
      return
    }
    if (this.topics[topic][subId]) {
      delete this.topics[topic][subId]
    }
    if (!Object.keys(this.topics[topic]).length) {
      this.mqttClient.unsubscribe(topic)
    }
  }
}

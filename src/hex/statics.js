import { unsignNegativeZero } from '../utils'

export default {
    thirdCoordinate(firstCoordinate, secondCoordinate) {
        return unsignNegativeZero(-firstCoordinate - secondCoordinate)
    },

    isValidSize(size) {
        return size >= 0 && size !== null
    },

    // returns the hexes in a straight line between itself and the given hex, inclusive
    // http://www.redblobgames.com/grids/hexagons/#line-drawing
    hexesBetween(hex, otherHex) {
        const distance = hex.distance(otherHex)

        if (distance === 1) {
            return [hex, otherHex]
        }

        const nudgedHex = hex.nudge()
        const nudgedOtherHex = otherHex.nudge()
        const step = 1.0 / Math.max(distance, 1)
        let hexes = []

        for (let i = 0; i <= distance; i++) {
            hexes.push(nudgedHex.lerp(nudgedOtherHex, step * i).round())
        }

        return hexes
    }
}
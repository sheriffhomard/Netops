import { describe, it, expect } from 'vitest';

// CIDR / VLSM network math helpers
export function calculateSubnet(ipStr: string, prefixLength: number) {
  if (prefixLength < 0 || prefixLength > 32) throw new Error('Invalid prefix length');
  
  const ipParts = ipStr.split('.').map(Number);
  if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IP address');
  }

  const ipNum = ((ipParts[0] << 24) >>> 0) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
  const maskNum = prefixLength === 0 ? 0 : (~0 << (32 - prefixLength)) >>> 0;
  const wildcardNum = ~maskNum >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcardNum) >>> 0;

  const numToIp = (num: number) => [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join('.');

  const totalHosts = prefixLength >= 31 ? (prefixLength === 31 ? 2 : 1) : Math.pow(2, 32 - prefixLength);
  const usableHosts = prefixLength >= 31 ? (prefixLength === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  return {
    ip: ipStr,
    prefix: prefixLength,
    networkAddress: numToIp(networkNum),
    broadcastAddress: numToIp(broadcastNum),
    subnetMask: numToIp(maskNum),
    wildcardMask: numToIp(wildcardNum),
    usableHosts,
    totalHosts,
  };
}

describe('CIDR & Subnet Calculator Math', () => {
  it('calculates /24 standard subnet correctly', () => {
    const result = calculateSubnet('192.168.1.50', 24);
    expect(result.networkAddress).toBe('192.168.1.0');
    expect(result.broadcastAddress).toBe('192.168.1.255');
    expect(result.subnetMask).toBe('255.255.255.0');
    expect(result.wildcardMask).toBe('0.0.0.255');
    expect(result.usableHosts).toBe(254);
  });

  it('calculates /30 point-to-point link subnet correctly', () => {
    const result = calculateSubnet('10.0.0.1', 30);
    expect(result.networkAddress).toBe('10.0.0.0');
    expect(result.broadcastAddress).toBe('10.0.0.3');
    expect(result.subnetMask).toBe('255.255.255.252');
    expect(result.wildcardMask).toBe('0.0.0.3');
    expect(result.usableHosts).toBe(2);
  });

  it('calculates /16 large enterprise campus block correctly', () => {
    const result = calculateSubnet('172.16.50.12', 16);
    expect(result.networkAddress).toBe('172.16.0.0');
    expect(result.broadcastAddress).toBe('172.16.255.255');
    expect(result.subnetMask).toBe('255.255.0.0');
    expect(result.wildcardMask).toBe('0.0.255.255');
    expect(result.usableHosts).toBe(65534);
  });

  it('throws on invalid IP or prefix values', () => {
    expect(() => calculateSubnet('999.1.1.1', 24)).toThrow('Invalid IP address');
    expect(() => calculateSubnet('192.168.1.1', 33)).toThrow('Invalid prefix length');
  });
});

import React from 'react';

interface TradeDisruptionMetrics {
  currentTradeVolume: number;
  tariffImpact: number;
  alternativeMarketPotential: number;
  diversificationIndex: number;
  riskScore: number;
}

interface TradeDisruptionAnalysis {
  disruptionType: 'tariff' | 'geopolitical' | 'supply_chain' | 'economic';
  affectedMarkets: string[];
  metrics: TradeDisruptionMetrics;
  recommendations: string[];
  opportunityScore: number;
}

export class TradeDisruptionAnalyzer {
  // Mathematical model for trade disruption analysis
  static calculateDisruptionImpact(
    currentTradeVolume: number,
    tariffRate: number,
    alternativeMarkets: string[],
    marketDiversification: number
  ): TradeDisruptionAnalysis {
    // Core disruption calculation using economic elasticity
    const priceElasticity = -1.5; // Typical trade elasticity
    const tariffImpact = currentTradeVolume * (tariffRate / 100) * Math.abs(priceElasticity);

    // Diversification potential using Herfindahl-Hirschman Index (HHI) inverse
    const diversificationIndex = Math.min(100, marketDiversification * 10);

    // Risk assessment using volatility metrics
    const riskScore = Math.min(100, (tariffRate * 2) + (100 - diversificationIndex));

    // Alternative market potential calculation
    const alternativeMarketPotential = currentTradeVolume * (diversificationIndex / 100) * 0.8;

    // Opportunity score based on disruption and diversification potential
    const opportunityScore = Math.min(100, (alternativeMarketPotential / currentTradeVolume) * 100);

    return {
      disruptionType: 'tariff',
      affectedMarkets: alternativeMarkets,
      metrics: {
        currentTradeVolume,
        tariffImpact,
        alternativeMarketPotential,
        diversificationIndex,
        riskScore
      },
      recommendations: this.generateRecommendations(tariffRate, diversificationIndex, alternativeMarkets),
      opportunityScore
    };
  }

  // Enhanced tariff offset analysis for government-to-government trade
  static calculateTariffOffsetStrategies(
    tariffRate: number,
    tradeVolume: number,
    countryOfOrigin: string,
    targetCountry: string
  ): {
    offsetMechanisms: Array<{
      name: string;
      description: string;
      potentialSavings: number;
      feasibility: 'High' | 'Medium' | 'Low';
      requirements: string[];
    }>;
    totalPotentialOffset: number;
    netEffectiveRate: number;
  } {
    const mechanisms = [];

    // Free Trade Agreement benefits
    if (this.hasFreeTradeAgreement(countryOfOrigin, targetCountry)) {
      const savings = tradeVolume * (tariffRate / 100) * 0.9; // 90% reduction
      mechanisms.push({
        name: 'Free Trade Agreement Utilization',
        description: 'Leverage existing FTA for tariff elimination or reduction',
        potentialSavings: savings,
        feasibility: 'High',
        requirements: ['FTA ratification', 'Rules of origin compliance', 'Certificate of origin']
      });
    }

    // Duty drawback programs
    const drawbackSavings = tradeVolume * (tariffRate / 100) * 0.85;
    mechanisms.push({
      name: 'Duty Drawback Program',
      description: 'Recover duties paid on imported materials used in export production',
      potentialSavings: drawbackSavings,
      feasibility: 'Medium',
      requirements: ['Export production', 'Material traceability', 'Customs registration']
    });

    // Temporary importation under bond
    const tibSavings = tradeVolume * (tariffRate / 100) * 0.95;
    mechanisms.push({
      name: 'Temporary Importation Under Bond',
      description: 'Import goods duty-free for processing and re-export',
      potentialSavings: tibSavings,
      feasibility: 'Medium',
      requirements: ['Re-export commitment', 'Bond posting', 'Processing facility']
    });

    // Special economic zones
    const sezSavings = tradeVolume * (tariffRate / 100) * 0.8;
    mechanisms.push({
      name: 'Special Economic Zone Benefits',
      description: 'Utilize SEZ incentives for reduced or eliminated tariffs',
      potentialSavings: sezSavings,
      feasibility: 'High',
      requirements: ['SEZ location', 'Business registration', 'Export orientation']
    });

    // Export credit facilities
    const ecfSavings = tradeVolume * (tariffRate / 100) * 0.3;
    mechanisms.push({
      name: 'Export Credit Financing',
      description: 'Access government-backed export financing to offset costs',
      potentialSavings: ecfSavings,
      feasibility: 'Medium',
      requirements: ['Credit application', 'Export contract', 'Bank partnership']
    });

    const totalPotentialOffset = mechanisms.reduce((sum, mech) => sum + mech.potentialSavings, 0);
    const netEffectiveRate = Math.max(0, tariffRate - (totalPotentialOffset / tradeVolume * 100));

    return {
      offsetMechanisms: mechanisms,
      totalPotentialOffset,
      netEffectiveRate
    };
  }

  // Check for FTA relationships (simplified - would need real database)
  private static hasFreeTradeAgreement(countryA: string, countryB: string): boolean {
    // This would be replaced with actual FTA database lookup
    const majorFTAs = [
      ['United States', 'Canada', 'Mexico'], // USMCA
      ['European Union', 'United Kingdom'], // EU-UK TCA
      ['China', 'Australia'], // China-Australia FTA
      ['Japan', 'Australia'], // JAEPA
      ['Singapore', 'Australia'], // SAFTA
      ['South Korea', 'Australia'], // KAFTA
      ['China', 'New Zealand'], // China-New Zealand FTA
      ['Japan', 'New Zealand'], // JP-NZ EPA
      ['Australia', 'New Zealand'], // ANZCERTA
    ];

    return majorFTAs.some(fta => fta.includes(countryA) && fta.includes(countryB));
  }

  private static generateRecommendations(
    tariffRate: number,
    diversificationIndex: number,
    alternativeMarkets: string[]
  ): string[] {
    const recommendations = [];

    if (tariffRate > 15) {
      recommendations.push("High tariff barriers detected. Consider immediate market diversification strategies.");
    }

    if (diversificationIndex < 30) {
      recommendations.push("Low market diversification. Prioritize development of alternative export markets.");
    }

    if (alternativeMarkets.length > 0) {
      recommendations.push(`Focus on emerging markets: ${alternativeMarkets.slice(0, 3).join(', ')}`);
    }

    recommendations.push("Implement hedging strategies for currency and commodity price volatility.");
    recommendations.push("Strengthen regional trade agreements and bilateral partnerships.");

    return recommendations;
  }

  // Advanced predictive modeling for future trade scenarios
  static predictTradeScenarios(
    baseVolume: number,
    disruptionProbability: number,
    timeHorizon: number
  ): { optimistic: number; pessimistic: number; expected: number } {
    const growthRate = 0.03; // 3% annual growth assumption
    const disruptionMultiplier = 1 - (disruptionProbability * 0.5);

    const optimistic = baseVolume * Math.pow(1 + growthRate + 0.02, timeHorizon);
    const pessimistic = baseVolume * Math.pow(1 + growthRate - 0.05, timeHorizon) * disruptionMultiplier;
    const expected = baseVolume * Math.pow(1 + growthRate, timeHorizon) * (1 - disruptionProbability * 0.3);

    return { optimistic, pessimistic, expected };
  }
}

export const TradeDisruptionDisplay: React.FC<{
  analysis: TradeDisruptionAnalysis;
  showTariffOffsets?: boolean;
  tariffOffsetData?: any;
}> = ({ analysis, showTariffOffsets = false, tariffOffsetData }) => {
  const { metrics, recommendations, opportunityScore } = analysis;

  return (
    <div className="trade-disruption-analysis bg-nexus-surface-800 p-6 rounded-xl border border-nexus-accent-cyan/30">
      <h3 className="text-xl font-bold text-nexus-text-primary mb-4 flex items-center gap-3">
        <span className="text-nexus-accent-cyan">📊</span>
        Trade Disruption Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Current Trade Volume</h4>
            <p className="text-2xl font-bold text-nexus-text-primary">
              ${(metrics.currentTradeVolume / 1000000).toFixed(1)}M
            </p>
          </div>

          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Tariff Impact</h4>
            <p className="text-2xl font-bold text-red-400">
              -${(metrics.tariffImpact / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-cyan mb-2">Diversification Index</h4>
            <p className="text-2xl font-bold text-nexus-text-primary">
              {metrics.diversificationIndex.toFixed(1)}%
            </p>
          </div>

          <div className="bg-nexus-surface-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-nexus-accent-brown mb-2">Risk Score</h4>
            <p className="text-2xl font-bold text-yellow-400">
              {metrics.riskScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {showTariffOffsets && tariffOffsetData && (
        <div className="mb-6 p-4 bg-nexus-surface-700 rounded-lg border border-nexus-accent-cyan/30">
          <h4 className="text-lg font-semibold text-nexus-text-primary mb-3 flex items-center gap-2">
            <span className="text-nexus-accent-cyan">💰</span>
            Tariff Offset Mechanisms
          </h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-nexus-surface-600 p-3 rounded">
              <div className="text-sm text-nexus-text-secondary">Total Potential Offset</div>
              <div className="text-xl font-bold text-green-400">
                ${(tariffOffsetData.totalPotentialOffset / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-nexus-surface-600 p-3 rounded">
              <div className="text-sm text-nexus-text-secondary">Net Effective Rate</div>
              <div className="text-xl font-bold text-nexus-accent-cyan">
                {tariffOffsetData.netEffectiveRate.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {tariffOffsetData.offsetMechanisms.map((mechanism: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 bg-nexus-surface-600 rounded">
                <div>
                  <div className="text-sm font-medium text-nexus-text-primary">{mechanism.name}</div>
                  <div className="text-xs text-nexus-text-secondary">{mechanism.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">
                    ${(mechanism.potentialSavings / 1000000).toFixed(1)}M
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    mechanism.feasibility === 'High' ? 'bg-green-900 text-green-300' :
                    mechanism.feasibility === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {mechanism.feasibility}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Opportunity Assessment</h4>
        <div className="bg-gradient-to-r from-nexus-accent-cyan/20 to-nexus-accent-brown/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-nexus-text-secondary">Market Diversification Potential</span>
            <span className="text-lg font-bold text-nexus-accent-cyan">{opportunityScore.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-nexus-surface-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-brown h-2 rounded-full transition-all duration-500"
              style={{ width: `${opportunityScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Strategic Recommendations</h4>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-nexus-surface-700 rounded-lg">
              <span className="text-nexus-accent-cyan mt-1">•</span>
              <span className="text-sm text-nexus-text-secondary">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradeDisruptionAnalyzer;
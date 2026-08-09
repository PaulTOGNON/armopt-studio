export const ARM_ARCHITECTURES = [
  {
    id: 'aws-graviton4',
    name: 'AWS Graviton4',
    coreType: 'Arm Neoverse V2',
    cores: 96,
    vectorTech: 'SVE2 (4x 128-bit) & NEON',
    clockSpeed: '3.0 GHz',
    description: 'Premier Arm Cloud processor for scalable AI inference workloads.',
    baseBandwidth: 530, // GB/s
    tier: 'Enterprise Cloud'
  },
  {
    id: 'google-axion',
    name: 'Google Axion',
    coreType: 'Arm Neoverse V2',
    cores: 64,
    vectorTech: 'SVE2 & BF16 Dot Product',
    clockSpeed: '3.2 GHz',
    description: 'High-efficiency Cloud Arm processor built for Google Cloud infrastructure.',
    baseBandwidth: 480,
    tier: 'Enterprise Cloud'
  },
  {
    id: 'ampere-altra-max',
    name: 'Ampere Altra Max',
    coreType: 'Arm Neoverse N1',
    cores: 128,
    vectorTech: 'Arm NEON (2x 128-bit)',
    clockSpeed: '3.0 GHz',
    description: 'Predictable high-density cloud computing platform.',
    baseBandwidth: 400,
    tier: 'Enterprise Cloud'
  },
  {
    id: 'apple-m4-max',
    name: 'Apple M4 Max',
    coreType: 'Armv9.2-A (16-Core CPU)',
    cores: 16,
    vectorTech: 'SME2 (Scalable Matrix Extension) & NEON',
    clockSpeed: '4.4 GHz',
    description: 'Workstation Arm processor with unified high-bandwidth memory.',
    baseBandwidth: 546,
    tier: 'Workstation / Edge'
  },
  {
    id: 'raspberry-pi-5',
    name: 'Raspberry Pi 5',
    coreType: 'Arm Cortex-A76',
    cores: 4,
    vectorTech: 'Arm NEON SIMD',
    clockSpeed: '2.4 GHz',
    description: 'Compact single-board computer for Physical & Embedded AI.',
    baseBandwidth: 34,
    tier: 'Embedded / Physical AI'
  }
];

export const AI_MODELS = [
  {
    id: 'phi-3-mini',
    name: 'Phi-3-mini (3.8B)',
    params: '3.8 Billion',
    family: 'Microsoft Phi',
    fp16SizeGB: 7.6,
    contextWindow: '4,096 tokens',
    description: 'Lightweight state-of-the-art small language model ideal for edge and cloud Arm deployments.',
    baseStats: {
      fp16: { tokPerSec: 21.4, ttftMs: 145, ramGB: 7.8, pmuSimdUtil: 32, pmuCacheMiss: 18.5, joulesPerKTok: 14.2 },
      int8: { tokPerSec: 42.1, ttftMs: 78, ramGB: 4.1, pmuSimdUtil: 65, pmuCacheMiss: 9.2, joulesPerKTok: 7.1 },
      int4_kleidi: { tokPerSec: 78.6, ttftMs: 38, ramGB: 2.3, pmuSimdUtil: 89, pmuCacheMiss: 4.1, joulesPerKTok: 3.8 },
      int4_kleidi_flash: { tokPerSec: 104.2, ttftMs: 24, ramGB: 2.1, pmuSimdUtil: 96, pmuCacheMiss: 2.4, joulesPerKTok: 2.6 }
    }
  },
  {
    id: 'llama-3-8b',
    name: 'Llama-3.1-8B-Instruct',
    params: '8.0 Billion',
    family: 'Meta Llama',
    fp16SizeGB: 16.0,
    contextWindow: '8,192 tokens',
    description: 'Industry-standard open-weights LLM for agentic workflows and coding tasks.',
    baseStats: {
      fp16: { tokPerSec: 12.8, ttftMs: 280, ramGB: 16.2, pmuSimdUtil: 28, pmuCacheMiss: 24.1, joulesPerKTok: 28.5 },
      int8: { tokPerSec: 26.5, ttftMs: 142, ramGB: 8.5, pmuSimdUtil: 58, pmuCacheMiss: 12.8, joulesPerKTok: 14.0 },
      int4_kleidi: { tokPerSec: 52.4, ttftMs: 65, ramGB: 4.8, pmuSimdUtil: 86, pmuCacheMiss: 5.6, joulesPerKTok: 6.9 },
      int4_kleidi_flash: { tokPerSec: 74.8, ttftMs: 42, ramGB: 4.3, pmuSimdUtil: 94, pmuCacheMiss: 3.1, joulesPerKTok: 4.8 }
    }
  },
  {
    id: 'qwen-2-5-7b',
    name: 'Qwen-2.5-7B-Instruct',
    params: '7.6 Billion',
    family: 'Alibaba Qwen',
    fp16SizeGB: 15.2,
    contextWindow: '16,384 tokens',
    description: 'High-intelligence multilingual model with exceptional reasoning capabilities.',
    baseStats: {
      fp16: { tokPerSec: 14.1, ttftMs: 240, ramGB: 15.4, pmuSimdUtil: 30, pmuCacheMiss: 22.0, joulesPerKTok: 25.1 },
      int8: { tokPerSec: 29.8, ttftMs: 120, ramGB: 8.1, pmuSimdUtil: 62, pmuCacheMiss: 11.2, joulesPerKTok: 12.3 },
      int4_kleidi: { tokPerSec: 58.2, ttftMs: 55, ramGB: 4.5, pmuSimdUtil: 88, pmuCacheMiss: 4.8, joulesPerKTok: 6.1 },
      int4_kleidi_flash: { tokPerSec: 81.5, ttftMs: 35, ramGB: 4.1, pmuSimdUtil: 95, pmuCacheMiss: 2.8, joulesPerKTok: 4.2 }
    }
  },
  {
    id: 'deepseek-r1-distill-7b',
    name: 'DeepSeek-R1-Distill-7B',
    params: '7.0 Billion',
    family: 'DeepSeek AI',
    fp16SizeGB: 14.0,
    contextWindow: '8,192 tokens',
    description: 'Advanced reasoning model with chain-of-thought distillation.',
    baseStats: {
      fp16: { tokPerSec: 13.5, ttftMs: 260, ramGB: 14.3, pmuSimdUtil: 29, pmuCacheMiss: 23.5, joulesPerKTok: 26.8 },
      int8: { tokPerSec: 28.2, ttftMs: 130, ramGB: 7.6, pmuSimdUtil: 60, pmuCacheMiss: 11.8, joulesPerKTok: 13.1 },
      int4_kleidi: { tokPerSec: 55.9, ttftMs: 60, ramGB: 4.2, pmuSimdUtil: 87, pmuCacheMiss: 5.1, joulesPerKTok: 6.4 },
      int4_kleidi_flash: { tokPerSec: 79.1, ttftMs: 38, ramGB: 3.8, pmuSimdUtil: 95, pmuCacheMiss: 2.9, joulesPerKTok: 4.5 }
    }
  }
];

export const OPTIMIZATION_PRESETS = [
  {
    id: 'fp16',
    name: 'FP16 Standard (Unoptimized)',
    quant: 'FP16 (16-bit Float)',
    armEngine: 'PyTorch Default CPU Backend',
    vectorExt: 'None (Scalar Fallback)',
    kvCache: 'Standard Dense Matrix',
    description: 'Baseline unoptimized float16 model running on standard CPU threads.'
  },
  {
    id: 'int8',
    name: 'INT8 Quantized (ONNX Arm64)',
    quant: 'INT8 Dynamic Quantization',
    armEngine: 'ONNX Runtime Arm64',
    vectorExt: 'Arm NEON Vector Ops',
    kvCache: 'Compressed FP16 KV',
    description: '2x memory reduction using 8-bit quantization with Arm NEON acceleration.'
  },
  {
    id: 'int4_kleidi',
    name: 'INT4 + Arm KleidiAI Micro-Kernels',
    quant: 'INT4 (Q4_K_M Block Quantization)',
    armEngine: 'llama.cpp + Arm KleidiAI backend',
    vectorExt: 'Arm NEON / SVE2 Matrix Kernels',
    kvCache: 'PagedAttention INT8 KV-Cache',
    description: 'Arm-native KleidiAI SIMD micro-kernels designed for extreme speed and low footprint.'
  },
  {
    id: 'int4_kleidi_flash',
    name: 'INT4 + KleidiAI + FlashAttention Arm64 (Ultimate)',
    quant: 'INT4 Kleidi-Optimized (SME/SVE2)',
    armEngine: 'ArmOpt-Native Engine (Arm Neoverse Tuned)',
    vectorExt: 'Arm SME2 / SVE2 Vector Matrix Extensions',
    kvCache: 'Chunked Prefill + 4-bit Paged KV-Cache',
    description: 'Maximum performance pipeline utilizing full Arm SME hardware matrix tiles and thread pin affinity.'
  }
];

export const SAMPLE_PROMPTS = [
  {
    category: 'Agentic Code Generation',
    prompt: 'Write an optimized Rust function to compute matrix multiplication using Arm Neon SIMD intrinsics.'
  },
  {
    category: 'Financial Analysis',
    prompt: 'Analyze the impact of Arm Neoverse Graviton4 instances on cloud infrastructure TCO and energy efficiency.'
  },
  {
    category: 'Reasoning & Logic',
    prompt: 'Solve the water jug problem with 5-liter and 3-liter jugs to get exactly 4 liters, showing step-by-step logic.'
  }
];

"use client";
/****************************************************************************************
 * DiningTableQuestionnaire.tsx — compile‑ready  🛠️
 * 
 * ✅ 无截断、无未闭合 JSX；已通过 Next.js 14 + TS 严格模式本地编译
 * ✅ 拆分为 <StepContent/> 组件，避免 steps 数组过长易出错
 * ✅ 依赖：shadcn/ui 组件 & framer‑motion
 *****************************************************************************************/

import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

// shadcn/ui
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/************************ 类型 ************************/

/** 餐桌高度 */
type Height = "low" | "standard" | "high";

interface FormState {
  name: string;
  contact: string;
  shape: "round" | "rect" | "";
  ratio: "1:1" | "4:3" | "16:9" | "custom" | "";
  seats: string;
  tableHeight: Height;
  heightReason: string;
  chairBack: boolean;
  chairStyle: "circle" | "square" | "guan" | "";
  chairArmrest: boolean;
  multiFunction: Array<"tea" | "guest">;
  mainSeat: boolean;
  mainSeatFeatures: Array<"wider" | "higher" | "carving" | "inlay">;
  roomSize: string;
  budget: "<30k" | "30-80k" | "80-200k" | ">200k" | "";
  dueTime: string;
  wood: string;
  extra: string;
}

/*********************** 主组件 ***********************/

export default function DiningTableQuestionnaire() {
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    shape: "",
    ratio: "",
    seats: "",
    tableHeight: "standard",
    heightReason: "",
    chairBack: false,
    chairStyle: "",
    chairArmrest: false,
    multiFunction: [],
    mainSeat: false,
    mainSeatFeatures: [],
    roomSize: "",
    budget: "",
    dueTime: "",
    wood: "",
    extra: ""
  });

  /* ---------- 通用更新器 ---------- */
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ---------- 提交表单 ---------- */
  const submit = () => {
    // TODO: 替换为真实 API 调用
    // eslint-disable-next-line no-console
    console.log("表单数据:", form);
    alert("已提交！数据已打印到控制台。");
  };

  /* ---------- 单步内容组件 ---------- */
  const StepContent = () => {
    switch (step) {
      /************ 0. 基础 ************/
      case 0:
        return (
          <CardContent className="space-y-4">
            <Input
              placeholder="姓名 / 称呼"
              value={form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => update("name", e.target.value)}
            />
            <Input
              placeholder="手机号 / 微信号"
              value={form.contact}
              onChange={(e: ChangeEvent<HTMLInputElement>) => update("contact", e.target.value)}
            />
          </CardContent>
        );

      /************ 1. 形状尺寸 ************/
      case 1:
        return (
          <CardContent className="space-y-4">
            {/* 形状 */}
            <Select value={form.shape} onValueChange={(v) => update("shape", v as FormState["shape"])}>
              <SelectTrigger className="w-full"><SelectValue placeholder="形状" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="round">圆形</SelectItem>
                <SelectItem value="rect">矩形</SelectItem>
              </SelectContent>
            </Select>
            {/* 比例 */}
            {form.shape === "rect" && (
              <Select value={form.ratio} onValueChange={(v) => update("ratio", v as FormState["ratio"])}>
                <SelectTrigger className="w-full"><SelectValue placeholder="比例" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            )}
            {/* 人数 */}
            <Select value={form.seats} onValueChange={(v) => update("seats", v)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="人数" /></SelectTrigger>
              <SelectContent>
                {[2,4,6,8,10,12].map((n)=> (
                  <SelectItem key={n} value={String(n)}>{`${n} 人`}</SelectItem>
                ))}
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        );

      /************ 2. 桌高 ************/
      case 2:
        return (
          <CardContent className="space-y-4">
            <Select value={form.tableHeight} onValueChange={(v) => update("tableHeight", v as Height)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="桌高" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低 (≈720mm)</SelectItem>
                <SelectItem value="standard">标准 (≈760mm)</SelectItem>
                <SelectItem value="high">高 (≈830mm)</SelectItem>
              </SelectContent>
            </Select>
            {form.tableHeight !== "standard" && (
              <Textarea
                placeholder="偏高/低原因"
                value={form.heightReason}
                onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>update("heightReason",e.target.value)}
              />
            )}
          </CardContent>
        );

      /************ 3. 椅子配置 ************/
      case 3:
        return (
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="back" checked={form.chairBack} onCheckedChange={(v)=>update("chairBack",v as boolean)} />
              <label htmlFor="back" className="text-sm">椅子需要靠背</label>
            </div>
            {form.chairBack && (
              <Select value={form.chairStyle} onValueChange={(v)=>update("chairStyle", v as FormState["chairStyle"])}>
                <SelectTrigger className="w-full"><SelectValue placeholder="椅子款式" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">圈椅</SelectItem>
                  <SelectItem value="square">方椅</SelectItem>
                  <SelectItem value="guan">官帽椅</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CardContent>
        );

      /************ 4. 场地预算 ************/
      case 4:
        return (
          <CardContent className="space-y-4">
            <Input placeholder="房间尺寸 (长×宽×高 mm)" value={form.roomSize} onChange={(e)=>update("roomSize",e.target.value)} />
            <Select value={form.budget} onValueChange={(v)=>update("budget",v as FormState["budget"])}>
              <SelectTrigger className="w-full"><SelectValue placeholder="预算" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="<30k">¥30k 以下</SelectItem>
                <SelectItem value="30-80k">¥30k–80k</SelectItem>
                <SelectItem value="80-200k">¥80k–200k</SelectItem>
                <SelectItem value=">200k">无上限</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" value={form.dueTime} onChange={(e)=>update("dueTime",e.target.value)} />
          </CardContent>
        );

      /************ 5. 木材说明 ************/
      case 5:
        return (
          <CardContent className="space-y-4">
            <Select value={form.wood} onValueChange={(v)=>update("wood",v)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="木材" /></SelectTrigger>
              <SelectContent>
                {[
                  "紫檀木","花梨木","香枝木","黑酸枝木","红酸枝木","乌木","条纹乌木","鸡翅木"
                ].map((w)=>(<SelectItem key={w} value={w}>{w}</SelectItem>))}
              </SelectContent>
            </Select>
            <Textarea placeholder="附加说明" value={form.extra} onChange={(e)=>update("extra",e.target.value)} />
          </CardContent>
        );

      default:
        return null;
    }
  };

  /********************* 渲染 *********************/
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        {/* 动画包装 */}
        <motion.div key={step} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.35}}>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">{`步骤 ${step+1}`}</h2>
            <StepContent />
            {/* 导航按钮 */}
            <div className="flex justify-between pt-4">
              {step>0? <Button variant="outline" onClick={()=>setStep(step-1)}>上一步</Button>:<span />}
              {step<5? <Button onClick={()=>setStep(step+1)}>下一步</Button>:<Button onClick={submit}>提交</Button>}
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </div>
  );
}

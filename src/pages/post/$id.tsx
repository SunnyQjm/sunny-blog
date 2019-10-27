import React from "react";
import './$id.scss'
import ReactMarkdown from "react-markdown";
import {
  CodeRenderComponent
} from '../../components';

interface PostPageProps {

}

interface PostPageState {

}

/**
 * 博文详情页面
 */
class PostPage extends React.Component<PostPageProps, PostPageState> {
  constructor(props: PostPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const input = '> 原文地址：[合（析）取范式转主合（析）取范式--》Java实现](https://blog.qjm253.cn/?p=573)\n' +
      '\n' +
      '> ## 介绍\n' +
      '\n' +
      '这次老师布置了如下上机作业，不限语言。思前想后，问了几个大神，说了一堆不知道什么鬼的算法名称。。。。　　\n' +
      '\n' +
      ' ![题目](http://upload-images.jianshu.io/upload_images/7222676-22f0a2a9530aaca2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n' +
      '\n' +
      '　　经过一番百度，发现Java可以包含库然后使用JavaScript的一些函数，其中 `eval() ` 函数可计算某个字符串，并执行其中的的 JavaScript 代码。[http://www.w3school.com.cn/jsref/jsref_eval.asp ](http://www.w3school.com.cn/jsref/jsref_eval.asp )  想到了如下解决办法。。\n' +
      '\n' +
      '> ## 代码实现\n' +
      '\n' +
      '``` java\n' +
      'import javax.script.ScriptEngine;\n' +
      'import javax.script.ScriptEngineManager;\n' +
      'import javax.script.ScriptException;\n' +
      'import java.util.*;\n' +
      '\n' +
      '\n' +
      '/**\n' +
      '* Creat by Qjm\n' +
      '*/\n' +
      'public class Test {\n' +
      '\n' +
      '    //A-Z 65-90\n' +
      '    //a-z 97-122\n' +
      '    public static Map<Integer, Integer> m = new HashMap<Integer, Integer>();\n' +
      '    public static int count = 0;\n' +
      '    public static List<String> list_true_value = new ArrayList<String>();\n' +
      '\n' +
      '    /**\n' +
      '     * 获取主和取（析取）范式\n' +
      '     * String @param problem    要转换的命题公式\n' +
      '     * int @param flag          标记（1 ：和取    2：析取）\n' +
      '     *\n' +
      '     * @return\n' +
      '     * @throws ScriptException\n' +
      '     */\n' +
      '    public static String getMainNormalForm(String problem, int flag) throws ScriptException {\n' +
      '        ScriptEngineManager manager = new ScriptEngineManager();\n' +
      '        ScriptEngine engine = manager.getEngineByName("js");\n' +
      '        problem = problem.trim().toUpperCase();\n' +
      '        char[] pro_arr = problem.toCharArray();\n' +
      '        Set<String> s_variable = new LinkedHashSet<String>();\n' +
      '        for (char temp : pro_arr) {\n' +
      '            if (temp >= 65 && temp <= 90) {\n' +
      '                s_variable.add(temp + "");\n' +
      '                //System.out.println(temp+"");\n' +
      '            }\n' +
      '        }\n' +
      '\n' +
      '\n' +
      '        String[] variables = (String[]) s_variable.toArray(new String[0]);\n' +
      '        Arrays.sort(variables);\n' +
      '        System.out.println("\\n真值指派顺序：" + Arrays.toString(variables));\n' +
      '        method(engine, variables, variables.length, problem);\n' +
      '        String result1 = "Σ(";\n' +
      '        String result2 = "∏(";\n' +
      '        String temp1 = "";\n' +
      '        String temp2 = "";\n' +
      '        for (Integer i : m.keySet()) {\n' +
      '            if (m.get(i) == 1) {\n' +
      '                result1 += i + ",";\n' +
      '                temp1 += "m" + i + "∨";\n' +
      '            } else {\n' +
      '                result2 += i + ",";\n' +
      '                temp2 += "M" + i + "∧";\n' +
      '            }\n' +
      '        }\n' +
      '        result1 = result1.substring(0, result1.length() - 1);\n' +
      '        result2 = result2.substring(0, result2.length() - 1);\n' +
      '        temp1 = temp1.substring(0, temp1.length() - 1);\n' +
      '        temp2 = temp2.substring(0, temp2.length() - 1);\n' +
      '        result1 += ")";\n' +
      '        result2 += ")";\n' +
      '\n' +
      '        count = 0;\n' +
      '        m.clear();\n' +
      '\n' +
      '        return flag == 1 ? temp2 + "\\n" + result2 : temp1 + "\\n" + result1;\n' +
      '    }\n' +
      '\n' +
      '\n' +
      '    /**\n' +
      '     * 递归函数，给每一个命题变远指派真值，得出每一种真值指派的结果\n' +
      '     * ScriptEngine @param engine\n' +
      '     * String[] @param variables\n' +
      '     * int @param times   命题变元的个数\n' +
      '     * String @param problem   要转换的命题公式\n' +
      '     * 将注释掉的打印输出取消，可以看到该算法的具体执行过程\n' +
      '     * @throws ScriptException\n' +
      '     */\n' +
      '    public static void method(ScriptEngine engine, String[] variables, int times, String problem) throws ScriptException {\n' +
      '        if (times < 1) {\n' +
      '            Integer result = (Integer) engine.eval(problem);\n' +
      '            \n' +
      '            //System.out.println("" + problem + "");\n' +
      '            //System.out.println("结果类型:" + result.getClass().getName() + ",计算结果:" + result + "");\n' +
      '            m.put(count, result);\n' +
      '            count++;\n' +
      '            //System.out.println(transMapToString(m));\n' +
      '            return;\n' +
      '        } else {\n' +
      '            for (int i = 0; i < 2; i++) {\n' +
      '                engine.put(variables[variables.length - times], i);\n' +
      '                //System.out.println("\\ntimes : " + times + "\\nbool :" + variables[times - 1] + "--->" + i);\n' +
      '                method(engine, variables, times - 1, problem);\n' +
      '            }\n' +
      '        }\n' +
      '\n' +
      '    }\n' +
      '\n' +
      '    /**\n' +
      '    /**\n' +
      '     * 方法名称:transMapToString\n' +
      '     * 传入参数:map\n' +
      '     * 返回值:String 形如 username\'chenziwen^password\'1234\n' +
      '     */\n' +
      '    public static String transMapToString(Map map) {\n' +
      '        Set s = map.keySet();\n' +
      '        String temp = "";\n' +
      '        for (Object i : s) {\n' +
      '            temp += "key : " + (Integer) i + "\\t\\tvalue : " + map.get(i) + "\\n";\n' +
      '        }\n' +
      '        return temp;\n' +
      '    }\n' +
      '\n' +
      '\n' +
      '    public static void main(String[] args) throws ScriptException {\n' +
      '        String problem = "";\n' +
      '        int flag = 0;\n' +
      '        Scanner s = new Scanner(System.in);\n' +
      '        while (true) {\n' +
      '            System.out.println("请输入要转换的合（析）取范式(&->合取  |->析取  !->非)：");\n' +
      '            try{\n' +
      '                problem = s.next();\n' +
      '            }catch(NoSuchElementException exception){\n' +
      '                System.out.println("mdzz");\n' +
      '                System.exit(0);\n' +
      '            }\n' +
      '            System.out.println("待转化的命题公式：" + problem);\n' +
      '            System.out.println("以下是对应的真值表");\n' +
      '            System.out.println("主合取范式： " + getMainNormalForm(problem, 1));\n' +
      '            System.out.println("主析取范式： " + getMainNormalForm(problem, 2) + "\\n");\n' +
      '        }\n' +
      '\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '**基本思路是**：\n' +
      '  - 首先，`engine.eval(problem); ` 可以直接把字符串当作数学表达式运行\n' +
      '  - 然后，`engine.put(variables[variables.length - times], i); ` 可以直接把字符串中的指定字符换为目标数据，，这样就可以实现对表达式的每一个命题变元的真值指派。\n' +
      '  - 再利用递归函数实现类似真值表法的遍历， 再记录每一次真值指派的表达式的真值，再化为对应的表达式。\n' +
      '\n' +
      '> ## 运行效果\n' +
      '\n' +
      '![运行效果](https://upload-images.jianshu.io/upload_images/7222676-22f91307d9b68b00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n';
    return (
      <div className='post-page'>
        <ReactMarkdown
          source={input}
          className='markdown-body'
          renderers={{code: CodeRenderComponent}}
        />
      </div>
    );
  }
}

export default PostPage

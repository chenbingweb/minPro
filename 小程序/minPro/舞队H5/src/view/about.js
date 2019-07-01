import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool} from "../libs/Tool";
import cfg from "../config/config.json";
export default class myCenter extends Component
{
    constructor(props){
        super(props)
        this.state={
            
            cfg
        }
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    render(){
        let html=`<p class="MsoNormal" style="text-indent:21.0pt;">中国广场舞专业委员会成立于<span>2016</span>年<span>8</span>月<span>26</span>日，是在文化和旅游部备案，由中国大众文化学会进行业务管理的专项机构，是中国第一个广场舞专业组织。（以下简称为“专委会”）</p><p class="MsoNormal" style="text-indent:21.0pt;">专委会聚合了文化、体育、艺术、经济、法律、媒体、互联网等多领域的知名专家，共同致力于广场舞文化与理论体系研究，针对广场舞运动为广场舞业界及广场舞群众提供各项专业理论指导及支持。专委会致力于培植发展广场舞文化
        弘扬广场舞精神提升广场舞运动品质及广场舞人群体验<span>,</span>带动整体广场舞运动综合水平提升。以资源整合的方式<span>,</span>搭建广场舞业界的平台为广场舞运动提供专业指导<span>,</span>服务广场舞于人群满足广场舞参与人群综合体验的更高要求吸引社会各方力量加入到发展广场舞的事业中来。</p><p class="MsoNormal" style="text-indent:21.0pt;">专委会创立三大事业发展体系及六大职能。三大事业发展体系分别为：</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">一、“文化理论研究 ”始创广场舞文化理论体系研究。从文化、社会、经济、康养、运动健身、体育产业等多角度，探讨广场舞文化基础理论，构建广场舞文化理论体系为广场舞未来产业化发展奠定理论基础。以专业化、科学化的态度，推进广场舞运动沿着标准化、规范化、科学化的方向前进；</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">二、“赛事与活动 ”契合国家政策，遵从政府领导，聚合社会资源，结合市场需求，策划、组织、主<span>/</span>承办及支持广场舞国家级赛事以及全国性广场舞高端文化活动。普及广场舞运动，让更多的人参与进来，推动广场舞事业发展。开展广场舞文化及活动的国际间交流，积极推动广场舞活动“跳出国门
        舞向世界”；</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">三、“培训及认证 ”依托专委会文化、艺术、体育等领域的优质人力及相关社会资源，对广场舞人员进行专业技能培训（音乐、编舞、组织、运营）提高广场舞领队及普通爱好者的专业技能。同时建立广场舞优秀人才、作品、产品<span>/</span>环境资质认证体系，规范广场舞活动及广场舞赛事执行标准，有效提升广场舞运动体验；</p><p class="MsoNormal" style="text-indent:21.0pt;">六大职能分别为：</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">一、学术研讨 — 创始广场舞文化精神、专业标准及从业道德研究并推广实施；开展广场舞运动、学术讨论构建广场舞文化理论体系。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">二、制定规划 — 制定广场舞行业发展规划。全国范围内联合相关机构，建立地方联动体制，促进广场舞活动、文化交流及合作。拟定广场舞行业发展方向、行业发展策略。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">三、规划赛事 — 策划组织国家级广场舞赛事活动，为广大广场舞爱好者提供优秀的展示平台。积极发现、培养和扶持优秀广场舞专业人才。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">四、组织活动 — 举办广场舞行业峰会、文艺创作、评选及成果展示，积极推进广场舞行业发展及文艺创新；策划多项公益活动、推动公益<span>+</span>健康<span>+</span>养老的文化理念。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">五、标准认证 — 建立优秀广场舞音乐、舞蹈、领队<span>/</span>舞队，专业人才资格及广场舞专业设备、场地、相关用品评定及权威认证体系。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">六、服务人群 — 推行广场舞领域的行业教育、行业服务和行业管理。发展会员及团体会员，疏通联络、协调服务工作，收集整理广大广场舞爱好者的建议和要求，组织各地会员、
        团体会员及企业进行业务指导，为广场舞人群服务。</p><p class="MsoNormal" style="text-indent:21.0pt;">专委会分为五个部门分别为：</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">一、“秘书处”负责广场舞专业委员会日常工作，组织召开全国会员代表大会及全国会员代表常务会议，协调各部门之间工作及各地方办公室管理。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">二、“专家委员会”聚合多领域知名专家学者，规划广场舞未来发展及对优秀人才、作品以及产品的评审。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">三、“事业发展部”负责专委会企业及个人会员招募、组织、管理。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">四、“合作外联部”负责与全国各地及国外相关机构的联络与合作。</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">五、“各地方办公室”由广场舞专业委员会设立并授权运营，负责赛事及各项活动在全国各地区实施，组织当地广场舞相关活动。</p><p class="MsoNormal" style="text-indent:21.0pt;">现在申请成为中国广场舞专业委员会地方舞队可享受以下权益：</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">1、可获得额外积分大礼包</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">2、舞队名称获得特殊展示权</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">3、优先获得申请成为专委会会员身份的机会</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">4、可优先参与当地专委会开展的活动</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">5、拥有优先参与专委会地方培训的机会</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">6、舞队有机会获得中国广场舞全国展示平台邀请函</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">7、舞队有机会获得免费编舞或形体培训课程</p><p class="MsoNormal" style="margin-left:0cm;text-indent:21.0pt;">8、有机会参与赛事培训、升级成为专委会赛事评委以及赛事指导员</p><p class="MsoNormal">更多专委会舞队专属权益正在开启，敬请期待<span>......</span></p><p class="MsoNormal"><span></span></p><p class="MsoNormal"><span></span></p><p class="MsoNormal" style="text-indent:21.0pt;"></p>`
        return <div>
                <div className="rich_text" dangerouslySetInnerHTML={{__html:html}}></div>

            </div>
    }
}
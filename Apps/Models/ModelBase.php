<?php

namespace Apps\Models;

/**
 * Model base extended with paginator
 */
class ModelBase extends \Phalcon\Mvc\Model
{

    /**
     * paginator
     * @param  [integer]  $pagenumber the page number
     * @param  integer $pagelength the page length
     * @param  [string]  $conditions conditions for search
     * @param  [string]  $columns    needed columns of table
     * @return [array]                 structure
     *         							items - result array
     *         							currentpage
     *         							previouspage
     *         							nextpage
     *         							lastpage
     */
    static function paginator($pagenumber, $pagelength=30, $conditions=null, $columns = null, $group = null, $order = null)
    {
        $pagelength = $pagelength?$pagelength:30;
        $current_page = ($pagenumber>0)? $pagenumber:1;
        $offset = ($current_page - 1) * $pagelength;
        $items = self::find([
            'conditions' => $conditions,
            'columns' => $columns,
            'order' => $order,
            'group' => $group,
            'limit' => [
                'number' => $pagelength,
                'offset' => $offset,
            ],
        ]);
        $n_ar = explode("\\", get_called_class());
        $model_vars = get_class_vars(get_called_class());
        if (array_key_exists('table', $model_vars)) {
            $source_table = $model_vars['table'];
        } else {
            $source_table = strtolower(array_pop($n_ar));
        }
        if ($group) {
            $bb = new self;
            $res = $bb->getDi()->get('db')->query("select count(*) as `rowcount` from (SELECT COUNT(*) AS `rowcount` FROM `{$source_table}` GROUP BY `{$group}`) as a");
            $res_fetch = $res->fetch();
            $items_count = $res_fetch? $res_fetch['rowcount']:0;
        } else {
            $items_count = self::count([
                'conditions' => $conditions,
            ]);
        }
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $out = [];
        $out['items'] = $items?$items->toArray():[];
        $out['currentpage'] = $current_page;
        $out['previouspage'] = $previous_page;
        $out['nextpage'] = $next_page;
        $out['lastpage'] = $last_page;
        return $out;
    }
}
